// src/index.ts
import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 3000;

const server = () => {
  app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
  });

  app.listen(PORT as number, '0.0.0.0', () => {
    console.log(
      `[server]: Server is running at http://localhost:${PORT}, mode is:${process.env.NODE_ENV}`
    );
  });
};

server();
