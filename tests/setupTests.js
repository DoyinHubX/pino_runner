import mongoose from 'mongoose';
import { startServer } from '../index.js';

let server;

beforeAll(async () => {
  server = await startServer();
  await mongoose.connect(process.env.MONGODB_URI);
});

afterAll(async () => {
  await mongoose.disconnect();
  await new Promise(resolve => server.close(resolve));
});