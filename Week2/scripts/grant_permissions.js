require("dotenv").config();
const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log("\n🔐 Setting up permissions using:", deployer.address);

  // Contract addresses
  const rewardAddress = "0xa96F56cE20C58DCa334EF5651B9BDCc760f1760B";
  const taskAddress = "0x06A376f7D43822f8Be055C4B5299D826865Af802";
  const certAddress = "0x5Ae223228bC24a71a6bfcd685c44B6e555F55BbC";
  const badgeAddress = "0xdf2Df153963950a98f0Abd8CF8Da9E84266168D9";
  const controllerAddress = "0x7029aC7f0a5c1d2b7Ed7EC649AC7F4b054493Ac3";

  console.log("\n📋 Contract Addresses:");
  console.log("InternRewardToken:         ", rewardAddress);
  console.log("TaskCompletionToken:       ", taskAddress);
  console.log("InternshipCertificateNFT:  ", certAddress);
  console.log("AchievementBadgeNFT:       ", badgeAddress);
  console.log("MintingController:         ", controllerAddress);

  try {
    // Connect to deployed contracts
    const rewardToken = await hre.ethers.getContractAt("InternRewardToken", rewardAddress);
    const taskToken = await hre.ethers.getContractAt("TaskCompletionToken", taskAddress);
    const certNFT = await hre.ethers.getContractAt("InternshipCertificateNFT", certAddress);
    const badgeNFT = await hre.ethers.getContractAt("AchievementBadgeNFT", badgeAddress);

    // Calculate MINTER_ROLE hash (standard AccessControl role)
    const MINTER_ROLE = hre.ethers.utils.keccak256(hre.ethers.utils.toUtf8Bytes("MINTER_ROLE"));
    
    console.log("\n⏳ Granting MINTER_ROLE to MintingController...");
    console.log("MINTER_ROLE hash:", MINTER_ROLE);
    
    // Grant on InternRewardToken
    console.log("\n  1️⃣  Granting on InternRewardToken...");
    try {
      let tx = await rewardToken.grantRole(MINTER_ROLE, controllerAddress);
      console.log("     🔗 Tx:", tx.hash);
      await tx.wait();
      console.log("     ✅ Done");
    } catch (error) {
      console.log("     ⚠️  Error:", error.message);
    }
    
    // Grant on TaskCompletionToken
    console.log("\n  2️⃣  Granting on TaskCompletionToken...");
    try {
      let tx = await taskToken.grantRole(MINTER_ROLE, controllerAddress);
      console.log("     🔗 Tx:", tx.hash);
      await tx.wait();
      console.log("     ✅ Done");
    } catch (error) {
      console.log("     ⚠️  Error:", error.message);
    }
    
    // Grant on InternshipCertificateNFT
    console.log("\n  3️⃣  Granting on InternshipCertificateNFT...");
    try {
      let tx = await certNFT.grantRole(MINTER_ROLE, controllerAddress);
      console.log("     🔗 Tx:", tx.hash);
      await tx.wait();
      console.log("     ✅ Done");
    } catch (error) {
      console.log("     ⚠️  Error:", error.message);
    }
    
    // Grant on AchievementBadgeNFT
    console.log("\n  4️⃣  Granting on AchievementBadgeNFT...");
    try {
      let tx = await badgeNFT.grantRole(MINTER_ROLE, controllerAddress);
      console.log("     🔗 Tx:", tx.hash);
      await tx.wait();
      console.log("     ✅ Done");
    } catch (error) {
      console.log("     ⚠️  Error:", error.message);
    }

    console.log("\n🎉 Permission setup complete!");
    console.log("✅ MintingController can now mint tokens and NFTs!\n");
    
  } catch (error) {
    console.error("\n❌ Setup failed:");
    console.error(error.message);
    throw error;
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});