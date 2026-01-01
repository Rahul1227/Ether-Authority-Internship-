require("dotenv").config();
const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log("\n🔐 Granting BACKEND_ROLE using:", deployer.address);

  const controllerAddress = "0x7029aC7f0a5c1d2b7Ed7EC649AC7F4b054493Ac3";
  const backendWallet = "0x2636597201775cBaa22C8fc9DA72CDe3f57A509d";

  console.log("\n📋 Addresses:");
  console.log("MintingController:  ", controllerAddress);
  console.log("Backend Wallet:     ", backendWallet);

  try {
    // Connect to MintingController
    const controller = await hre.ethers.getContractAt("MintingController", controllerAddress);

    // Calculate BACKEND_ROLE hash
    const BACKEND_ROLE = hre.ethers.utils.keccak256(hre.ethers.utils.toUtf8Bytes("BACKEND_ROLE"));
    
    console.log("\n⏳ Granting BACKEND_ROLE...");
    console.log("BACKEND_ROLE hash:", BACKEND_ROLE);
    
    const tx = await controller.grantRole(BACKEND_ROLE, backendWallet);
    console.log("🔗 Transaction hash:", tx.hash);
    console.log("⏳ Waiting for confirmation...");
    
    await tx.wait();
    
    console.log("✅ BACKEND_ROLE granted successfully!");
    
    // Verify the role was granted
    const hasRole = await controller.hasRole(BACKEND_ROLE, backendWallet);
    console.log("\n✅ Verification: Backend wallet has BACKEND_ROLE =", hasRole);
    
    console.log("\n🎉 Setup complete! Your backend can now mint tokens and NFTs!\n");
    
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