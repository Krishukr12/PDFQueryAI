import { getAllChat, postChat } from '@controllers/chat.controller';
import { Router } from 'express';

export const chatRouter = Router();
// GET   : all chats
chatRouter.get('/all-chats', getAllChat);

// POST  : all chat
chatRouter.post('/post', postChat);
