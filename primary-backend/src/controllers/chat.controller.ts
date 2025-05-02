// import { pdfPrismaClint } from '@db/index';
import { createError } from '@utils/createError';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export const getAllChat = (req: Request, res: Response, next: NextFunction) => {
  const userId = req.auth?.userId;
  console.log(userId);
  res.send('all chat router');
};

export const postChat = async (req: Request, res: Response, next: NextFunction) => {
  const { chat, userId } = req.body;
  try {
    // const response = await pdfPrismaClint.user.create({
    //   data: {
    //     userId,
    //     role: 'USER',
    //     content: chat,
    //   },
    // });
    console.log(userId);
  } catch (error) {
    next(createError(StatusCodes.INTERNAL_SERVER_ERROR, 'something went wrong'));
  }
  res.send('post chat');
};
