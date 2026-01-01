const { contracts } = require("../config/contracts");

module.exports = {
  // Mint Intern Reward Tokens
  mintReward: async (req, res) => {
    try {
      const { user, amount, rewardType } = req.body;

      // FIXED: Use giveReward (not giveTaskReward)
      const tx = await contracts.controller.giveReward(user, amount, rewardType);
      await tx.wait();

      res.json({ success: true, tx: tx.hash });
    } catch (err) {
      console.log("❌ mintReward error:", err.message);
      res.json({ error: err.message });
    }
  },

  // Mint Task Completion Tokens
  mintTaskReward: async (req, res) => {
    try {
      const { user, amount, taskId } = req.body;

      // FIXED: Use giveTaskReward and include taskId parameter
      const tx = await contracts.controller.giveTaskReward(user, amount, taskId);
      await tx.wait();

      res.json({ success: true, tx: tx.hash });
    } catch (err) {
      console.log("❌ mintTaskReward error:", err.message);
      res.json({ error: err.message });
    }
  },

  // Mint Certificate NFT
  mintCertificate: async (req, res) => {
    try {
      const { user, cid } = req.body;

      const tx = await contracts.controller.issueCertificate(user, cid);
      await tx.wait();

      res.json({ success: true, tx: tx.hash });
    } catch (err) {
      console.log("❌ mintCertificate error:", err.message);
      res.json({ error: err.message });
    }
  },

  // Mint Badge NFT
  mintBadge: async (req, res) => {
    try {
      const { user, cid } = req.body;

      const tx = await contracts.controller.giveBadge(user, cid);
      await tx.wait();

      res.json({ success: true, tx: tx.hash });
    } catch (err) {
      console.log("❌ mintBadge error:", err.message);
      res.json({ error: err.message });
    }
  }
};