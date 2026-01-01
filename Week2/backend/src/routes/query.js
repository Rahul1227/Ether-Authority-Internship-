const express = require("express");
const router = express.Router();
const { contracts } = require("../config/contracts");

router.get("/balance/reward/:user", async (req,res)=>{
  try {
    const bal = await contracts.reward.balanceOf(req.params.user);
    res.json({ balance: bal.toString() });
  } catch(err){
    res.json({ error: err.message });
  }
});

router.get("/balance/task/:user", async (req,res)=>{
  try {
    const bal = await contracts.task.balanceOf(req.params.user);
    res.json({ balance: bal.toString() });
  } catch(err){
    res.json({ error: err.message });
  }
});

router.get("/nft/certificates/:user", async (req,res)=>{
  try {
    const tokens = await contracts.certificate.tokensOfOwner(req.params.user);
    res.json({ tokens });
  } catch(err){
    res.json({ error: err.message });
  }
});

router.get("/nft/badges/:user", async (req,res)=>{
  try {
    const tokens = await contracts.badge.tokensOfOwner(req.params.user);
    res.json({ tokens });
  } catch(err){
    res.json({ error: err.message });
  }
});

module.exports = router;
