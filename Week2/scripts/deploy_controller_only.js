require("dotenv").config();
const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log("\n🚀 Deploying MintingController using:", deployer.address);
  console.log("💰 Balance:", (await deployer.getBalance()).toString());

  // Already deployed contract addresses
  const rewardAddress = "0xa96F56cE20C58DCa334EF5651B9BDCc760f1760B";
  const taskAddress = "0x06A376f7D43822f8Be055C4B5299D826865Af802";
  const certAddress = "0x5Ae223228bC24a71a6bfcd685c44B6e555F55BbC";
  const badgeAddress = "0xdf2Df153963950a98f0Abd8CF8Da9E84266168D9";

  console.log("\n📋 Using existing contracts:");
  console.log("InternRewardToken:         ", rewardAddress);
  console.log("TaskCompletionToken:       ", taskAddress);
  console.log("InternshipCertificateNFT:  ", certAddress);
  console.log("AchievementBadgeNFT:       ", badgeAddress);

  try {
    // --- Minting Controller ---
    console.log("\n📦 Deploying MintingController...");
    console.log("⏳ This may take 1-3 minutes...");
    
    const Controller = await hre.ethers.getContractFactory("MintingController");
    
    console.log("📤 Sending deployment transaction...");
    const controller = await Controller.deploy(
      rewardAddress,
      taskAddress,
      certAddress,
      badgeAddress,
      {
        gasLimit: 5000000, // Explicit gas limit
      }
    );
    
    console.log("⏳ Waiting for confirmation...");
    console.log("🔗 Transaction hash:", controller.deployTransaction.hash);
    console.log("🔍 View on Etherscan: https://sepolia.etherscan.io/tx/" + controller.deployTransaction.hash);
    
    await controller.deployed();
    console.log("✅ MintingController:", controller.address);

    console.log("\n🎉 Deployment finished!");
    console.log("\n📋 All Contract Addresses:");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("InternRewardToken:         ", rewardAddress);
    console.log("TaskCompletionToken:       ", taskAddress);
    console.log("InternshipCertificateNFT:  ", certAddress);
    console.log("AchievementBadgeNFT:       ", badgeAddress);
    console.log("MintingController:         ", controller.address);
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
  } catch (error) {
    console.error("\n❌ Deployment failed:");
    console.error(error.message);
    throw error;
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});