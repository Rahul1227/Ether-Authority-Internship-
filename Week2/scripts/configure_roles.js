const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Configuring roles using:", deployer.address);

  const controllerAddr        = "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9";
  const rewardTokenAddr       = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const taskTokenAddr         = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
  const certificateNFTAddr    = "0x0165878A594ca255338adfa4d48449f69242Eb8F";
const badgeNFTAddr          = "0xa513E6E4b8f2a923D98304ec87F64353C4D5C853";


  const rewardToken    = await hre.ethers.getContractAt("InternRewardToken", rewardTokenAddr);
  const taskToken      = await hre.ethers.getContractAt("TaskCompletionToken", taskTokenAddr);
  const certificateNFT = await hre.ethers.getContractAt("InternshipCertificateNFT", certificateNFTAddr);
  const badgeNFT       = await hre.ethers.getContractAt("AchievementBadgeNFT", badgeNFTAddr);

  // granting controller permissions
  await rewardToken.grantRole(await rewardToken.REWARD_MANAGER_ROLE(), controllerAddr);
  await taskToken.grantRole(await taskToken.VERIFIER_ROLE(), controllerAddr);
  await certificateNFT.grantRole(await certificateNFT.CERTIFICATE_MINTER_ROLE(), controllerAddr);
  await badgeNFT.grantRole(await badgeNFT.BADGE_MINTER_ROLE(), controllerAddr);

  console.log("Roles configured successfully:");
  console.log("  Controller now authorized to mint everything.");
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
