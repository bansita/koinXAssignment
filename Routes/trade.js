const csvtojson = require("csvtojson");
const fs = require("fs");
const Trade = require("../Model/Trade");
const router = require("express").Router();
const path = require("path");

// upload trades
router.post("/upload-trades", async (req, res) => {
  try {
    const filePath = path.join(__dirname, "../csvFile.csv");
    const csvData = fs.readFileSync(filePath, "utf8");
    console.log("CSV data:", csvData);

    const trades = await csvtojson().fromString(csvData);
    console.log("Parsed trades:", trades);

    const processedData = trades.map((trade) => {
      const [baseCoin, quoteCoin] = trade.Market.split("/");
      const buyOrSellAmount = parseFloat(trade["Buy/Sell Amount"]);
      const price = parseFloat(trade.Price);

      return {
        userId: trade.User_ID,
        utcTime: new Date(trade.UTC_Time),
        operation: trade.Operation,
        market: trade.Market,
        baseCoin,
        quoteCoin,
        buyOrSellAmount,
        price,
      };
    });

    await Trade.insertMany(processedData);
    res.status(200).json({ message: "Trades saved successfully" });
  } catch (err) {
    console.error("Error uploading trades:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// get balances
router.post("/get-balances", async (req, res) => {
  try {
    const { timestamp } = req.body;
    const parsedTimestamp = new Date(timestamp);
    const trades = await Trade.find({ utcTime: { $lte: parsedTimestamp } });
    const balances = {};

    trades.forEach((trade) => {
      const { baseCoin, buyOrSellAmount, operation } = trade;
      const amount = operation === "Buy" ? buyOrSellAmount : -buyOrSellAmount;
      balances[baseCoin] = (balances[baseCoin] || 0) + amount;
    });

    res.status(200).json(balances);
  } catch (err) {
    console.error("Error getting balances:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
