import multer from 'multer';
import fs from 'fs';
import path from 'path';

import { Router } from 'express';
import { handlePdfUpload } from '@controllers/pdf.controller';

const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext);
    cb(null, `${name}-${Date.now()}${ext}`);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter(req, file, cb) {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('only pdf is allowed'));
    }
  },
});

export const uploadPdfRouter: Router = Router();

uploadPdfRouter.post('/pdf', upload.single('pdf'), handlePdfUpload);
