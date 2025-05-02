import { pdfPrismaClient } from '@db/index';
import { createError } from '@utils/createError';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export const getAllChat = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.auth?.userId ?? '';
  try {
    const response = await pdfPrismaClient.chat.findMany({
      where: {
        userId,
      },
      select: {
        content: true,
        role: true,
        createdAt: true,
        updateAt: true,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });
    if (response) {
      res.status(StatusCodes.OK).send({
        success: true,
        data: response,
      });
    }
  } catch (error) {
    next(createError(StatusCodes.INTERNAL_SERVER_ERROR, 'something went wrong'));
  }
};

export const postChat = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.auth?.userId ?? '';
  const { chat } = req.body;
  try {
    const response = await pdfPrismaClient.chat.create({
      data: {
        role: 'USER',
        userId,
        content: chat,
      },
    });

    // get AI response here , save it to db again and respond with current user question with AI answer

    if (response) {
      res.status(StatusCodes.OK).send({
        success: true,
      });
    }
  } catch (error) {
    next(createError(StatusCodes.INTERNAL_SERVER_ERROR, 'something went wrong'));
  }
};
