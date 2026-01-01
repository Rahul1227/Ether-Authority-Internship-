require("dotenv").config();
const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log("\n🚀 Deploying using:", deployer.address);
  console.log("💰 Balance:", (await deployer.getBalance()).toString());

  try {
    // --- ERC20: Reward Token ---
    console.log("\n📦 Deploying InternRewardToken...");
    const Reward = await hre.ethers.getContractFactory("InternRewardToken");
    const reward = await Reward.deploy(deployer.address);
    await reward.deployed();
    console.log("✅ InternRewardToken:", reward.address);

    // --- ERC20: Task Token ---
    console.log("\n📦 Deploying TaskCompletionToken...");
    const Task = await hre.ethers.getContractFactory("TaskCompletionToken");
    const task = await Task.deploy(deployer.address);
    await task.deployed();
    console.log("✅ TaskCompletionToken:", task.address);

    // --- ERC721: Certificate NFT ---
    console.log("\n📦 Deploying InternshipCertificateNFT...");
    const Cert = await hre.ethers.getContractFactory("InternshipCertificateNFT");
    const cert = await Cert.deploy();
    await cert.deployed();
    console.log("✅ InternshipCertificateNFT:", cert.address);

    // --- ERC721: Badge NFT ---
    console.log("\n📦 Deploying AchievementBadgeNFT...");
    const Badge = await hre.ethers.getContractFactory("AchievementBadgeNFT");
    const badge = await Badge.deploy();
    await badge.deployed();
    console.log("✅ AchievementBadgeNFT:", badge.address);

    // --- Minting Controller ---
    console.log("\n📦 Deploying MintingController...");
    const Controller = await hre.ethers.getContractFactory("MintingController");
    const controller = await Controller.deploy(
      reward.address,
      task.address,
      cert.address,
      badge.address
    );
    await controller.deployed();
    console.log("✅ MintingController:", controller.address);

    console.log("\n🎉 Deployment finished!");
    console.log("\n📋 Contract Addresses:");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("InternRewardToken:         ", reward.address);
    console.log("TaskCompletionToken:       ", task.address);
    console.log("InternshipCertificateNFT:  ", cert.address);
    console.log("AchievementBadgeNFT:       ", badge.address);
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