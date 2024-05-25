const express = require("express");
const connectToMongo = require("./db");
const tradeRouter = require("./Routes/trade");
const app = express();

connectToMongo();
app.use(express.json());

app.use("/api/trades", tradeRouter);

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
