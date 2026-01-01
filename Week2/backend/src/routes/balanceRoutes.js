// src/routes/balanceRoutes.js
const express = require("express");
const router = express.Router();
const { contracts } = require("../config/contracts");

// ---- Reward Token Balance ----
router.get("/reward/:user", async (req, res) => {
  try {
    const bal = await contracts.reward.balanceOf(req.params.user);
    res.json({ balance: bal.toString() });
  } catch (err) {
    console.error("Reward balance error:", err);
    res.json({ balance: "0", error: err.message });
  }
});

// ---- Task Token Balance ----
router.get("/task/:user", async (req, res) => {
  try {
    const bal = await contracts.task.balanceOf(req.params.user);
    res.json({ balance: bal.toString() });
  } catch (err) {
    console.error("Task balance error:", err);
    res.json({ balance: "0", error: err.message });
  }
});

module.exports = router;
