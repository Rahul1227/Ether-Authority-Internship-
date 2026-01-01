// routes/nftRoutes.js
const express = require("express");
const router = express.Router();
const { contracts } = require("../config/contracts");

router.get("/certificate/:tokenId", async (req, res) => {
  try {
    const uri = await contracts.certificate.tokenURI(req.params.tokenId);
    res.json({ uri });
  } catch (err) {
    res.json({ error: err.message });
  }
});

router.get("/badges/:tokenId", async (req, res) => {
  try {
    const uri = await contracts.badge.tokenURI(req.params.tokenId);
    res.json({ uri });
  } catch (err) {
    res.json({ error: err.message });
  }
});

module.exports = router;
