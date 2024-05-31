import app from '../../src/server';
import logger from '../../src/utils/logger';

const PORT = process.env.PORT || 3001;

let server;

const startServer = async () => {
  return new Promise((resolve, reject) => {
    server = app.listen(PORT, () => {
      logger.info(`App listening on port ${PORT}!`);
      resolve(server);
    });

    server.on('error', (error) => {
      logger.error(error);
      reject(error);
    });
  });
};

const stopServer = async () => {
  if (server) {
    await new Promise((resolve, reject) => {
      server.close((err) => {
        if (err) return reject(err);
        resolve();
      });
    });
  }
};

export { startServer, stopServer };
