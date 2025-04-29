import { PDF_QUEUE_SYSTEM } from '@const/queue-const';
import { QueueEvents, Worker } from 'bullmq';
import { Redis } from 'ioredis';

const redisConnection = new Redis({
  host: 'localhost',
  port: 6379,
});

const queueEvents = new QueueEvents(PDF_QUEUE_SYSTEM);

export const pdfQueueWorker = new Worker(
  PDF_QUEUE_SYSTEM,
  async (job) => {
    const { filePath } = job.data;
    console.log('coming to worker');

    await new Promise((resolve) => setTimeout(resolve, 3000));
    console.log(`worker have complete their job for filePath: ${filePath}`);
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

redisConnection.on('connect', () => {
  console.log('Redis connected successfully ( worker side )');
});

redisConnection.on('error', (err) => {
  console.error('Redis connection error:', err);
});

queueEvents.on('waiting', ({ jobId }) => {
  console.log(`A job with ID ${jobId} is waiting`);
});

queueEvents.on('active', ({ jobId, prev }) => {
  console.log(`Job ${jobId} is now active; previous status was ${prev}`);
});

queueEvents.on('completed', ({ jobId, returnvalue }) => {
  console.log(`${jobId} has completed and returned ${returnvalue}`);
});

queueEvents.on('failed', ({ jobId, failedReason }) => {
  console.log(`${jobId} has failed with reason ${failedReason}`);
});
