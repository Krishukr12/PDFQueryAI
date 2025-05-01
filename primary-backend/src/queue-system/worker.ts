import fs from 'fs';
import pdfParse from 'pdf-parse';

import { PDF_QUEUE_SYSTEM } from '@const/queue-const';
import { QueueEvents, Worker } from 'bullmq';
import { chunkText, getEmbedding, uploadToQdrant } from '@utils/worker';

const queueEvents = new QueueEvents(PDF_QUEUE_SYSTEM);

export const pdfQueueWorker = new Worker(
  PDF_QUEUE_SYSTEM,
  async (job) => {
    const { filePath } = job.data;

    // 1. Read and parse PDF
    const dataBuffer = fs.readFileSync(filePath);
    const pdfData = await pdfParse(dataBuffer);
    const text = pdfData.text;

    // 2. Chunk the text
    const chunks = chunkText(text, 500);

    // 3. Embed each chunk with HuggingFACE
    const embeddings = [];
    for (let chunk in chunks) {
      const embedding = await getEmbedding(chunk);
      if (embedding.length > 0) {
        embeddings.push({
          vector: embedding,
          payload: { text: chunk },
        });
      }
    }

    // 4. Store in Qdrant
    await uploadToQdrant(embeddings);

    console.log('✅ Embedding uploaded to QDrantDb successfully');
    return { success: true };
  },
  {
    connection: {
      host: 'localhost',
      port: 6379,
    },
    limiter: {
      max: 10,
      duration: 1000,
    },
  },
);

queueEvents.on('waiting', ({ jobId }) => {
  console.log(`✅ A job with ID ${jobId} is waiting`);
});

queueEvents.on('active', ({ jobId, prev }) => {
  console.log(`✅ Job ${jobId} is now active}`);
});

queueEvents.on('completed', ({ jobId, returnvalue }) => {
  console.log(`✅ ${jobId} has completed and returned ${returnvalue}`);
});

queueEvents.on('failed', ({ jobId, failedReason }) => {
  console.log(`❌ ${jobId} has failed with reason ${failedReason}`);
});
