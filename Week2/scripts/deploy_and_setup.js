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
    // --- Deploy MintingController ---
    console.log("\n📦 Deploying MintingController...");
    
    const Controller = await hre.ethers.getContractFactory("MintingController");
    
    console.log("📤 Sending deployment transaction...");
    const controller = await Controller.deploy(
      rewardAddress,
      taskAddress,
      certAddress,
      badgeAddress
    );
    
    console.log("🔗 Transaction hash:", controller.deployTransaction.hash);
    console.log("🔍 View: https://sepolia.etherscan.io/tx/" + controller.deployTransaction.hash);
    console.log("⏳ Waiting for confirmation...");
    
    await controller.deployed();
    console.log("✅ MintingController deployed:", controller.address);

    // --- Setup Permissions ---
    console.log("\n🔐 Setting up permissions...");
    
    // Connect to deployed contracts
    const rewardToken = await hre.ethers.getContractAt("InternRewardToken", rewardAddress);
    const taskToken = await hre.ethers.getContractAt("TaskCompletionToken", taskAddress);
    const certNFT = await hre.ethers.getContractAt("InternshipCertificateNFT", certAddress);
    const badgeNFT = await hre.ethers.getContractAt("AchievementBadgeNFT", badgeAddress);

    // Get MINTER_ROLE from each contract
    const MINTER_ROLE = await rewardToken.MINTER_ROLE();
    
    console.log("\n⏳ Granting MINTER_ROLE to MintingController...");
    
    console.log("  - Granting on InternRewardToken...");
    let tx = await rewardToken.grantRole(MINTER_ROLE, controller.address);
    await tx.wait();
    console.log("    ✅ Done");
    
    console.log("  - Granting on TaskCompletionToken...");
    tx = await taskToken.grantRole(MINTER_ROLE, controller.address);
    await tx.wait();
    console.log("    ✅ Done");
    
    console.log("  - Granting on InternshipCertificateNFT...");
    tx = await certNFT.grantRole(MINTER_ROLE, controller.address);
    await tx.wait();
    console.log("    ✅ Done");
    
    console.log("  - Granting on AchievementBadgeNFT...");
    tx = await badgeNFT.grantRole(MINTER_ROLE, controller.address);
    await tx.wait();
    console.log("    ✅ Done");

    console.log("\n🎉 Deployment and setup complete!");
    console.log("\n📋 All Contract Addresses:");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("InternRewardToken:         ", rewardAddress);
    console.log("TaskCompletionToken:       ", taskAddress);
    console.log("InternshipCertificateNFT:  ", certAddress);
    console.log("AchievementBadgeNFT:       ", badgeAddress);
    console.log("MintingController:         ", controller.address);
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("\n✅ MintingController has MINTER_ROLE on all contracts");
    console.log("✅ Ready to mint tokens and NFTs!\n");
    
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