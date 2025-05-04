import { createError } from '@utils/createError';
import { deleteAllEmbedding } from '@utils/worker';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export const handleDeleteAllEmbedding = async (req: Request, res: Response, next: NextFunction) => {
  const isAllEmbeddingDeleted = await deleteAllEmbedding();
  if (isAllEmbeddingDeleted) {
    res.status(StatusCodes.OK).send({
      status: true,
    });
    return;
  }
  next(createError(StatusCodes.INTERNAL_SERVER_ERROR, 'something went wrong'));
};
