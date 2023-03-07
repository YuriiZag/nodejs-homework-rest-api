const app = require("./app");
const { connectMongo } = require("./db/conection");

const start = () => {
  connectMongo().catch((err) => console.log(err));
  app.listen(3000, () => {
    console.log("Server running. Use our API on port: 3000");
  });
};

start();
