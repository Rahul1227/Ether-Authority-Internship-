const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying MintingController using:", deployer.address);

  // paste your deployed contract addresses here
  const rewardTokenAddr     = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const taskTokenAddr       = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
  const certificateNFTAddr  = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";
  const badgeNFTAddr        = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9";

  const Controller = await hre.ethers.getContractFactory("MintingController");
  const controller = await Controller.deploy(
    rewardTokenAddr,
    taskTokenAddr,
    certificateNFTAddr,
    badgeNFTAddr
  );

  await controller.deployed();
  console.log("MintingController:", controller.address);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
