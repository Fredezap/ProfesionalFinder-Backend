import express from 'express';
import dotenv from 'dotenv';
import { router } from './router';
import { connectToDatabase } from './database/connection';

// TODO: add setEnvVariables
dotenv.config();

connectToDatabase();

const server = express();

server.use('/api', router);

export default server;
