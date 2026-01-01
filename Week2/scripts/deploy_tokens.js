const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying tokens using:", deployer.address);

  const cap = hre.ethers.utils.parseEther("1000000"); // 1M cap

  const RewardToken = await hre.ethers.getContractFactory("InternRewardToken");
  const rewardToken = await RewardToken.deploy(cap);
  await rewardToken.deployed();
  console.log("InternRewardToken:", rewardToken.address);

  const TaskToken = await hre.ethers.getContractFactory("TaskCompletionToken");
  const taskToken = await TaskToken.deploy(cap);
  await taskToken.deployed();
  console.log("TaskCompletionToken:", taskToken.address);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
