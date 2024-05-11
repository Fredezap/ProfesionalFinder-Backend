import express from 'express';
import mongoose from 'mongoose';
import expressOasGenerator from 'express-oas-generator';
import dotenv from 'dotenv';
import logger from 'morgan';
import { router } from './router';

// TODO: add setEnvVariables
dotenv.config();

const PRODUCTION = 'production';

const server = express();

const mongooseModels = mongoose.modelNames();

expressOasGenerator.handleResponses(server, {
  specOutputPath: './api_docs.json',
  mongooseModels,
  ignoredNodeEnvironments: [PRODUCTION],
  alwaysServeDocs: true,
});

server.use(logger(process.env.LOGGER_LEVEL));

server.use('/api', router);

expressOasGenerator.handleRequests();

export default server;
