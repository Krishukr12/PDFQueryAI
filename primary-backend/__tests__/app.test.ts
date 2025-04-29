// import request from 'supertest';
// import express from 'express';
// import cors from 'cors';
// import { globalErrorHandler } from '@utils/globalErrorHandler';

// // Create app the same way as in your real app
// const app = express();

// app.use(express.json());
// app.use(cors());

// // Add a simple test route
// app.get('/health', (req, res) => {
//   res.status(200).json({ status: 'ok' });
// });

// app.use(globalErrorHandler);

// describe('Backend Server', () => {
//   it('should return 200 OK on /health route', async () => {
//     const response = await request(app).get('/health');

//     expect(response.status).toBe(200);
//     expect(response.body).toEqual({ status: 'ok' });
//   });

//   it('should handle unknown routes with 404', async () => {
//     const response = await request(app).get('/non-existing-route');

//     // If your global error handler catches 404, you can test it here
//     // Otherwise, it may return 404 by default
//     expect(response.status).toBe(404);
//   });
// });
