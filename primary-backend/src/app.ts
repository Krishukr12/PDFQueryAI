require('dotenv').config();

import express from 'express';
import cors from 'cors';

import { globalErrorHandler } from '@utils/globalErrorHandler';

const app = express();

const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());

app.use(globalErrorHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`🚀 PRIMARY BACKEND started successfully!`);
  // eslint-disable-next-line no-console
  console.log(`🌐 PRIMARY BACKEND is running on http://localhost:${PORT}`);
});
