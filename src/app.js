import app from "./server";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 3001;

(async () => {
  app.listen(PORT, async () => {
    console.log(`App listening on port ${PORT}!`);
  });
})();
