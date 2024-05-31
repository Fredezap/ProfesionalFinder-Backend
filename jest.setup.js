import {
  connectToDatabase,
  dropDatabase,
  closeConnection,
} from './src/database/connection';
import { startServer, stopServer } from './test/utils/server';

const setup = async () => {
  await startServer();
  await connectToDatabase();
};

const teardown = async () => {
  await stopServer();
  await dropDatabase();
  await closeConnection();
};

beforeAll(setup);

afterAll(teardown);
