const express = require("express");
const router = express.Router();
const { contracts } = require("../config/contracts");

// reward token
router.post("/reward/:wallet/:amount", async (req,res)=>{
  try {
    const tx = await contracts.controller.giveReward(
      req.params.wallet,
      req.params.amount
    );
    await tx.wait();
    res.json({ success:true, tx: tx.hash });
  } catch(err){
    console.log("Mint Reward Error:", err);
    res.json({ error: err.message });
  }
});

// task token
router.post("/task/:wallet/:amount/:taskId", async (req,res)=>{
  try {
    const tx = await contracts.controller.giveTaskReward(
      req.params.wallet,
      req.params.amount,
      req.params.taskId
    );
    await tx.wait();
    res.json({ success:true, tx: tx.hash });
  } catch(err){
    res.json({ error: err.message });
  }
});

// certificate
router.post("/certificate/:wallet/:cid", async (req,res)=>{
  try {
    const tx = await contracts.controller.issueCertificate(
      req.params.wallet,
      req.params.cid
    );
    await tx.wait();
    res.json({ success:true, tx: tx.hash });
  } catch(err){
    res.json({ error: err.message });
  }
});

// badge
router.post("/badge/:wallet/:cid", async (req,res)=>{
  try {
    const tx = await contracts.controller.giveBadge(
      req.params.wallet,
      req.params.cid
    );
    await tx.wait();
    res.json({ success:true, tx: tx.hash });
  } catch(err){
    res.json({ error: err.message });
  }
});

module.exports = router;
