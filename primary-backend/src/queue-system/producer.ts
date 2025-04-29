import { Queue } from 'bullmq';
import { Redis } from 'ioredis';

import { PDF_QUEUE_SYSTEM } from '@const/queue-const';

const redisConnection = new Redis({
  host: 'localhost',
  port: 6379,
});

export const pdfQueueProducer = new Queue(PDF_QUEUE_SYSTEM, {
  connection: redisConnection,
});

export const addToQueue = async (pdfPath: any) => {
  const response = await pdfQueueProducer.add(PDF_QUEUE_SYSTEM, { filePath: pdfPath });
  console.log(response);
  console.log(`added even to queue for file : ${pdfPath}`);
};

redisConnection.on('connect', () => {
  console.log('redis connected successfully (producer side)');
});

redisConnection.on('error', (error) => {
  console.log('error in redis connection ', error);
});
