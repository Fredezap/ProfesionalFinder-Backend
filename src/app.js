import express from "express";
import dotenv from "dotenv";

dotenv.config();

export const app = express();
const PORT = process.env.PORT || 3001;

(async () => {
  app.listen(PORT, async () => {
    console.log(`App listening on port ${PORT}!`);
  });
})();
