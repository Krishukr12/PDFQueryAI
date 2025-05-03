require('dotenv').config();

import cors from 'cors';
import path from 'path';

import express, { Request, Response } from 'express';
import { globalErrorHandler } from '@utils/globalErrorHandler';
import { uploadPdfRouter } from '@routes/pdfupload.routes';
import { chatRouter } from '@routes/chat.routes';
import { clerkMiddleware, requireAuth } from '@clerk/express';

const app = express();

const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use(clerkMiddleware());

app.get('/', (req: Request, res: Response) => {
  res.status(200).sendFile(path.join(__dirname, 'views', 'health.html'));
});

app.use('/upload', uploadPdfRouter);
app.use('/chat', requireAuth(), chatRouter);

app.use(globalErrorHandler);

app.listen(PORT, () => {
  console.log(`🚀 PRIMARY BACKEND started successfully!`);
  console.log(`🌐 PRIMARY BACKEND is running on http://localhost:${PORT}`);
});
