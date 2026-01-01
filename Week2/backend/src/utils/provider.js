const { ethers } = require("ethers");
require("dotenv").config();

// ---- ENV CHECK ----
if (!process.env.PRIVATE_KEY || !process.env.RPC_URL) {
  throw new Error("Missing PRIVATE_KEY or RPC_URL in .env");
}

// ---- V6 PROVIDER ----
const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);

// ---- V6 WALLET ----
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

// ---- LOG INFO ----
(async () => {
  try {
    const network = await provider.getNetwork();
    console.log("🌍 Network:", network.chainId.toString());
    console.log("👛 Wallet:", wallet.address);

    const bal = await provider.getBalance(wallet.address);
    console.log("💰 Balance:", ethers.formatEther(bal), "ETH\n");
  } catch (err) {
    console.log("❌ Provider error:", err.message);
  }
})();

module.exports = { provider, wallet };
