const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying NFTs using:", deployer.address);

  const Certificate = await hre.ethers.getContractFactory("InternshipCertificateNFT");
  const certificate = await Certificate.deploy();
  await certificate.deployed();
  console.log("InternshipCertificateNFT:", certificate.address);

  const Badge = await hre.ethers.getContractFactory("AchievementBadgeNFT");
  const badge = await Badge.deploy();
  await badge.deployed();
  console.log("AchievementBadgeNFT:", badge.address);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
