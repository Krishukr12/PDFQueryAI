require('dotenv').config();
import axios from 'axios';

import { QdrantClient } from '@qdrant/js-client-rest';
import { QDRANT_URL, URL } from '@const/worker-const';
import { v4 as uuidv4 } from 'uuid';

interface Embedding {
  vector: number[];
  payload: {
    text: string;
    [key: string]: any;
  };
}

const qdrant = new QdrantClient({
  url: QDRANT_URL,
  apiKey: process.env.QDRANT_DB,
});

export const chunkText = (text: string, maxLen = 500) => {
  const chunks = [];
  for (let i = 0; i < text.length; i += maxLen) {
    chunks.push(text.slice(i, i + maxLen));
  }
  return chunks;
};

export const getEmbedding = async (text: string): Promise<number[]> => {
  try {
    const response = await axios.post(
      URL,
      { inputs: text },
      {
        headers: {
          Authorization: `Bearer ${process.env.HUGGING_FACE}`,
          'Content-Type': 'application/json',
        },
      },
    );
    const result = response.data;
    return result;
  } catch (error) {
    console.error('Failed to get embedding:', error);
    return [];
  }
};

export const uploadToQdrant = async (embedding: Embedding[]) => {
  try {
    if (!Array.isArray(embedding) || embedding.length === 0) {
      throw new Error('Invalid embedding vector');
    }

    const collectionName = 'pdf-query-ai';
    const vectorSize = embedding[0].vector.length;

    try {
      await qdrant.getCollection(collectionName);
    } catch (err: any) {
      if (err.status === 404) {
        console.log(`ℹ️ Collection "${collectionName}" not found. Creating...`);

        // ✅ Use correct schema for single vector (unnamed)
        await qdrant.createCollection(collectionName, {
          vectors: {
            size: vectorSize,
            distance: 'Cosine',
          },
        });

        console.log(`✅ Collection "${collectionName}" created successfully.`);
      } else {
        throw err;
      }
    }

    const points = embedding.map((item) => ({
      id: uuidv4(),
      vector: item.vector,
      payload: item.payload,
    }));

    const response = await qdrant.upsert(collectionName, {
      points,
    });

    console.log('✅ Embedding inserted successfully:', response);
  } catch (err) {
    console.error('❌ Error inserting embedding:', err);
  }
};

export const searchInQdrant = async (vector: number[], topK = 5): Promise<string[]> => {
  const collectionName = 'pdf-query-ai';

  try {
    const searchResult = await qdrant.search(collectionName, {
      vector,
      limit: topK,
      with_payload: true,
    });

    if (!Array.isArray(searchResult) || searchResult.length === 0) {
      console.warn('⚠️ No relevant results found in Qdrant.');
      return [];
    }

    const contexts = searchResult
      .map((item) => item.payload?.text)
      .filter((text): text is string => typeof text === 'string');

    return contexts;
  } catch (error) {
    console.error('❌ Qdrant search failed:', error);
    return [];
  }
};

export const deleteAllEmbedding = async (): Promise<boolean | undefined> => {
  const collectionName = 'pdf-query-ai';
  try {
    const response = await qdrant.delete(collectionName, {
      filter: {},
    });
    if (response) {
      return true;
    }
  } catch (error) {
    return false;
  }
};
