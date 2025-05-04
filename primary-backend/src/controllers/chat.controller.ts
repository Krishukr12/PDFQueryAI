import { pdfPrismaClient } from '@db/index';
import { callAIModel } from '@utils/callModel';
import { createError } from '@utils/createError';
import { getEmbedding, searchInQdrant } from '@utils/worker';
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
    // 1. Save user chat to DB
    await pdfPrismaClient.chat.create({
      data: {
        role: 'USER',
        userId,
        content: chat,
      },
      select: {
        role: true,
        content: true,
        updateAt: true,
        createdAt: true,
      },
    });

    // 2. Embed user chat
    const userChatEmbedding = await getEmbedding(chat);

    // 3. Search context in QDrant
    const relevantDocs = await searchInQdrant(userChatEmbedding, 2);

    // 4. Call AI model with user input and context
    const aiPrompt = `
    Context:
    ${relevantDocs.join('\n\n')}

     User: ${chat}
     AI:`;

    const aiResponseText = await callAIModel(aiPrompt);

    // 5. Save AI response to DB
    await pdfPrismaClient.chat.create({
      data: {
        role: 'AI',
        userId,
        content: aiResponseText,
      },
    });
    // 6. Respond with both user and model message
    res.status(StatusCodes.OK).send({
      success: true,
      chat: aiResponseText,
    });
  } catch (error) {
    next(createError(StatusCodes.INTERNAL_SERVER_ERROR, 'something went wrong'));
  }
};
