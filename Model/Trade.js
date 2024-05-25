const mongoose = require("mongoose");

const tradeSchema = new mongoose.Schema({
  userId: String,
  utcTime: Date,
  operation: String,
  market: String,
  baseCoin: String,
  quoteCoin: String,
  buyOrSellAmount: Number,
  price: Number,
});

const Trade = mongoose.model("Trade", tradeSchema);
module.exports = Trade;
