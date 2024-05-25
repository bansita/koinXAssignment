const mongoose = require("mongoose");
require("dotenv").config();
const connectToMongo = () => {
  const mongourl = process.env.MONGO_URL;
  mongoose
    .connect(mongourl)
    .then(() => {
      console.log("connected to mongo");
    })
    .catch((err) => {
      console.log("failed to connect", err);
    });
};
module.exports = connectToMongo;
