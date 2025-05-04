import { handleDeleteAllEmbedding } from '@controllers/qdrantdb.controller';
import { Router } from 'express';

export const qdrantDbRouter: Router = Router();

qdrantDbRouter.delete('/delete-embedding', handleDeleteAllEmbedding);
