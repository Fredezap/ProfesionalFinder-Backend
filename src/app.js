import app from "./server";

const PORT = process.env.PORT || 3001;

(async () => {
  app.listen(PORT, async () => {
    console.log(`App listening on port ${PORT}!`);
  });
})();
