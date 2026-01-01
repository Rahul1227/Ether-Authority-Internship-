const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// existing query route (keep this first if it handles base routes)
app.use("/", require("./routes/query"));

// minting routes
app.use("/mint", require("./routes/mintingRoutes"));

// NEW — balance routes for dashboard tokens
app.use("/balance", require("./routes/balanceRoutes"));

// NFT routes for certificates & badges
app.use("/nft", require("./routes/nftRoutes"));

module.exports = app;
