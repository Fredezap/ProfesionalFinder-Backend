import express from 'express';
import dotenv from 'dotenv';
import logger from 'morgan';
import { router } from './router';

// TODO: add setEnvVariables
dotenv.config();

const server = express();

server.use(logger(process.env.LOGGER_LEVEL));

server.use('/api', router);

export default server;
