import { createError } from '@utils/createError';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export const handlePdfUpload = (req: Request, res: Response, next: NextFunction) => {
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
};
