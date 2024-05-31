import dotenv from 'dotenv';
import {
  connectToDatabase,
  dropDatabase,
  closeConnection,
} from './src/database/connection';

dotenv.config({ path: '.env.test' });

const setup = async () => {
  await connectToDatabase();
};

const teardown = async () => {
  await dropDatabase();
  await closeConnection();
};

setup();

afterAll(teardown);
