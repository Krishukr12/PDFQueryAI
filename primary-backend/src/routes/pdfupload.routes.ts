import multer from 'multer';

import { Router } from 'express';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext);
    cb(null, `${name}-${Date.now()}${ext}`);
  },
});

const upload = multer({ storage });

import { handlePdfUpload } from '@controllers/pdf.controller';
import path from 'path';

export const uploadPdfRouter: Router = Router();

uploadPdfRouter.post('/pdf', upload.single('pdf'), handlePdfUpload);
