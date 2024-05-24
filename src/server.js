import express from 'express';
import mongoose from 'mongoose';
import expressOasGenerator from 'express-oas-generator';
import dotenv from 'dotenv';
import logger from 'morgan';
import cors from 'cors';
import { router } from './router';

// TODO: add setEnvVariables
const environment = process.env.NODE_ENV ? `.${process.env.NODE_ENV}` : '';
dotenv.config({ path: `.env${environment}` });

const PRODUCTION = 'production';
const TEST = 'test';

const server = express();

const mongooseModels = mongoose.modelNames();

expressOasGenerator.handleResponses(server, {
  specOutputPath: './api_docs.json',
  mongooseModels,
  ignoredNodeEnvironments: [PRODUCTION],
  alwaysServeDocs: true,
});

if (process.env.NODE_ENV !== TEST) {
  server.use(logger(process.env.LOGGER_LEVEL));
}

server.use(cors());
server.use(express.json());

server.use('/api', router);

expressOasGenerator.handleRequests();

export default server;
