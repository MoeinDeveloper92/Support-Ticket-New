// src/index.ts
import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import dataBaseConnection from './config/db';
import userRoutes from './routes/userRoutes';
import errorHandler from './middleware/error';
dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 3000;

//Entry point of the Server
const server = () => {
  //DATABASE
  dataBaseConnection.connectDB();
  //Entry route to the application
  app.get('/', (req: Request, res: Response) => {
    res.status(200).json({
      success: true,
      data: 'Welcome to the application',
    });
  });

  //Body Parser
  app.use(express.json({}));
  app.use(express.urlencoded({ extended: false }));

  //Routes
  app.use('/api/v1/users', userRoutes);

  app.use(errorHandler);
  app.listen(PORT as number, '0.0.0.0', () => {
    console.log(
      `The Server is running at http://localhost:${PORT}, mode is:${process.env.NODE_ENV}`
    );
  });

  process.on('uncaughtException', () => {
    console.log('SEVER SHOTDOWN');
    process.exit(1);
  });
};

server();
