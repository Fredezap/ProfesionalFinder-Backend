import mongoose from 'mongoose';
import logger from '../utils/logger';

export const connectToDatabase = async () => {
  try {
    const { MONGO_HOST, MONGO_PORT, MONGO_DATABASE } = process.env;

    await mongoose.connect(
      `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DATABASE}`,

      { useNewUrlParser: true, useUnifiedTopology: true },
    );

    logger.info(`Connected to database: ${MONGO_DATABASE}`);
  } catch (error) {
    logger.error(error?.stack);
  }
};

export const dropDatabase = () => mongoose.connection.dropDatabase();

export const closeConnection = () => mongoose.connection.close();
