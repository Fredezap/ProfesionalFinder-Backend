import app from './server';
import logger from './utils/logger';
import { connectToDatabase } from './database/connection';

const PORT = process.env.PORT || 3001;

(async () => {
  await connectToDatabase();

  app.listen(PORT, async () => {
    logger.info(`App listening on port ${PORT}!`);
  });
})();
