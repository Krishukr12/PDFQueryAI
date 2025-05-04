import { addToQueue } from '@queue-system/producer';
import { createError } from '@utils/createError';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export const handlePdfUpload = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.file) {
    next(createError(StatusCodes.BAD_REQUEST, 'file upload failed'));
    return;
  }
  const pdfFile = req.file;

  if (!pdfFile) {
    next(
      createError(
        StatusCodes.BAD_REQUEST,
        'file is missing or you might have uploaded multiple file',
      ),
    );
    return;
  }

  await addToQueue(req.file.path);

  // Publish Event from here to queue

  res.send({
    success: true,
    message: 'pdf uploaded successfully',
  });
};
