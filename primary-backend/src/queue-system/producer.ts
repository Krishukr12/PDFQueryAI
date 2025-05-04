require('dotenv').config();
import { Queue } from 'bullmq';
import { Redis } from 'ioredis';

import { PDF_QUEUE_SYSTEM } from '@const/queue-const';

const redisConnection = new Redis(process.env.REDIS_URL ?? '');

export const pdfQueueProducer = new Queue(PDF_QUEUE_SYSTEM, {
  connection: redisConnection,
});

export const addToQueue = async (pdfPath: any) => {
  try {
    await pdfQueueProducer.add(PDF_QUEUE_SYSTEM, { filePath: pdfPath });
    console.log(`✅ added even to queue for file : ${pdfPath}`);
  } catch (error) {
    console.log('❌ error while adding to queue', error);
  }
};

redisConnection.on('connect', () => {
  console.log('redis connected successfully (producer side)');
});

redisConnection.on('error', (error) => {
  console.log('error in redis connection ', error);
});
