require("dotenv").config();
const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log("\n🔐 Granting ALL correct roles using:", deployer.address);

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

    // Calculate role hashes
    const REWARD_MANAGER_ROLE = hre.ethers.utils.keccak256(hre.ethers.utils.toUtf8Bytes("REWARD_MANAGER_ROLE"));
    const VERIFIER_ROLE = hre.ethers.utils.keccak256(hre.ethers.utils.toUtf8Bytes("VERIFIER_ROLE"));
    const CERTIFICATE_MINTER_ROLE = hre.ethers.utils.keccak256(hre.ethers.utils.toUtf8Bytes("CERTIFICATE_MINTER_ROLE"));
    const BADGE_MINTER_ROLE = hre.ethers.utils.keccak256(hre.ethers.utils.toUtf8Bytes("BADGE_MINTER_ROLE"));
    
    console.log("\n📝 Role Hashes:");
    console.log("REWARD_MANAGER_ROLE:      ", REWARD_MANAGER_ROLE);
    console.log("VERIFIER_ROLE:            ", VERIFIER_ROLE);
    console.log("CERTIFICATE_MINTER_ROLE:  ", CERTIFICATE_MINTER_ROLE);
    console.log("BADGE_MINTER_ROLE:        ", BADGE_MINTER_ROLE);
    
    // 1. Grant REWARD_MANAGER_ROLE on InternRewardToken
    console.log("\n1️⃣  Granting REWARD_MANAGER_ROLE on InternRewardToken...");
    try {
      const hasRole1 = await rewardToken.hasRole(REWARD_MANAGER_ROLE, controllerAddress);
      if (hasRole1) {
        console.log("    ✅ Already has REWARD_MANAGER_ROLE");
      } else {
        const tx1 = await rewardToken.grantRole(REWARD_MANAGER_ROLE, controllerAddress);
        console.log("    🔗 Tx:", tx1.hash);
        await tx1.wait();
        console.log("    ✅ REWARD_MANAGER_ROLE granted!");
      }
    } catch (error) {
      console.log("    ❌ Error:", error.message);
    }
    
    // 2. Grant VERIFIER_ROLE on TaskCompletionToken
    console.log("\n2️⃣  Granting VERIFIER_ROLE on TaskCompletionToken...");
    try {
      const hasRole2 = await taskToken.hasRole(VERIFIER_ROLE, controllerAddress);
      if (hasRole2) {
        console.log("    ✅ Already has VERIFIER_ROLE");
      } else {
        const tx2 = await taskToken.grantRole(VERIFIER_ROLE, controllerAddress);
        console.log("    🔗 Tx:", tx2.hash);
        await tx2.wait();
        console.log("    ✅ VERIFIER_ROLE granted!");
      }
    } catch (error) {
      console.log("    ❌ Error:", error.message);
    }

    // 3. Grant CERTIFICATE_MINTER_ROLE on InternshipCertificateNFT
    console.log("\n3️⃣  Granting CERTIFICATE_MINTER_ROLE on InternshipCertificateNFT...");
    try {
      const hasRole3 = await certNFT.hasRole(CERTIFICATE_MINTER_ROLE, controllerAddress);
      if (hasRole3) {
        console.log("    ✅ Already has CERTIFICATE_MINTER_ROLE");
      } else {
        const tx3 = await certNFT.grantRole(CERTIFICATE_MINTER_ROLE, controllerAddress);
        console.log("    🔗 Tx:", tx3.hash);
        await tx3.wait();
        console.log("    ✅ CERTIFICATE_MINTER_ROLE granted!");
      }
    } catch (error) {
      console.log("    ❌ Error:", error.message);
    }

    // 4. Grant BADGE_MINTER_ROLE on AchievementBadgeNFT
    console.log("\n4️⃣  Granting BADGE_MINTER_ROLE on AchievementBadgeNFT...");
    try {
      const hasRole4 = await badgeNFT.hasRole(BADGE_MINTER_ROLE, controllerAddress);
      if (hasRole4) {
        console.log("    ✅ Already has BADGE_MINTER_ROLE");
      } else {
        const tx4 = await badgeNFT.grantRole(BADGE_MINTER_ROLE, controllerAddress);
        console.log("    🔗 Tx:", tx4.hash);
        await tx4.wait();
        console.log("    ✅ BADGE_MINTER_ROLE granted!");
      }
    } catch (error) {
      console.log("    ❌ Error:", error.message);
    }

    console.log("\n🎉 All roles granted successfully!");
    console.log("✅ MintingController has all required permissions!");
    console.log("✅ Ready to mint rewards, tasks, certificates, and badges!\n");
    
  } catch (error) {
    console.error("\n❌ Setup failed:");
    console.error(error);
    throw error;
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});