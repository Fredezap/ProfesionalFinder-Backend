import express from 'express';
import dotenv from 'dotenv';
import { router } from './router';

// TODO: add setEnvVariables
dotenv.config();

const server = express();

server.use('/api', router);

export default server;
