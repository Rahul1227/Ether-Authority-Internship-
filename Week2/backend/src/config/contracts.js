// src/config/contracts.js

const { ethers } = require("ethers");
const { wallet } = require("../utils/provider");

/**
 * @dev Contract configuration and initialization
 * Loads ABIs and creates contract instances
 * Uses existing ABI files from your project
 */

// Import ABIs - Using your existing ABI files
let rewardABI, taskABI, certificateABI, badgeABI, controllerABI;

// Load ABIs with error handling
try {
  rewardABI = require("../../abi/InternRewardToken.json");
  console.log('✅ InternRewardToken ABI loaded');
} catch (e) {
  console.warn('⚠️  InternRewardToken.json not found in abi folder');
}

try {
  taskABI = require("../../abi/TaskCompletionToken.json");
  console.log('✅ TaskCompletionToken ABI loaded');
} catch (e) {
  console.warn('⚠️  TaskCompletionToken.json not found in abi folder');
}

try {
  certificateABI = require("../../abi/InternshipCertificateNFT.json");
  console.log('✅ InternshipCertificateNFT ABI loaded');
} catch (e) {
  console.warn('⚠️  InternshipCertificateNFT.json not found in abi folder');
}

try {
  badgeABI = require("../../abi/AchievementBadgeNFT.json");
  console.log('✅ AchievementBadgeNFT ABI loaded');
} catch (e) {
  console.warn('⚠️  AchievementBadgeNFT.json not found in abi folder');
}

try {
  controllerABI = require("../../abi/MintingController.json");
  console.log('✅ MintingController ABI loaded');
} catch (e) {
  console.warn('⚠️  MintingController.json not found in abi folder');
}

console.log(''); // Empty line

const addresses = {
  reward:      "0xa96F56cE20C58DCa334EF5651B9BDCc760f1760B",
  task:        "0x06A376f7D43822f8Be055C4B5299D826865Af802",
  certificate: "0x5Ae223228bC24a71a6bfcd685c44B6e555F55BbC",
  badge:       "0xdf2Df153963950a98f0Abd8CF8Da9E84266168D9",
  controller:  "0x7029aC7f0a5c1d2b7Ed7EC649AC7F4b054493Ac3"
};


// Create contract instances
const contracts = {};

// Helper function to safely get ABI
function getABI(abiObj) {
  if (!abiObj) return null;
  return abiObj.abi || abiObj;
}

// Initialize contracts only if ABI is available
if (addresses.reward && rewardABI) {
  try {
    contracts.reward = new ethers.Contract(
      addresses.reward,
      getABI(rewardABI),
      wallet
    );
    console.log('✅ Reward Token contract initialized:', addresses.reward);
  } catch (e) {
    console.error('❌ Failed to initialize Reward Token:', e.message);
  }
} else if (addresses.reward && !rewardABI) {
  console.warn('⚠️  Reward Token address found but ABI missing');
}

if (addresses.task && taskABI) {
  try {
    contracts.task = new ethers.Contract(
      addresses.task,
      getABI(taskABI),
      wallet
    );
    console.log('✅ Task Token contract initialized:', addresses.task);
  } catch (e) {
    console.error('❌ Failed to initialize Task Token:', e.message);
  }
} else if (addresses.task && !taskABI) {
  console.warn('⚠️  Task Token address found but ABI missing');
}

if (addresses.certificate && certificateABI) {
  try {
    contracts.certificate = new ethers.Contract(
      addresses.certificate,
      getABI(certificateABI),
      wallet
    );
    console.log('✅ Certificate NFT contract initialized:', addresses.certificate);
  } catch (e) {
    console.error('❌ Failed to initialize Certificate NFT:', e.message);
  }
} else if (addresses.certificate && !certificateABI) {
  console.warn('⚠️  Certificate address found but ABI missing');
}

if (addresses.badge && badgeABI) {
  try {
    contracts.badge = new ethers.Contract(
      addresses.badge,
      getABI(badgeABI),
      wallet
    );
    console.log('✅ Badge NFT contract initialized:', addresses.badge);
  } catch (e) {
    console.error('❌ Failed to initialize Badge NFT:', e.message);
  }
} else if (addresses.badge && !badgeABI) {
  console.warn('⚠️  Badge address found but ABI missing');
}

if (addresses.controller && controllerABI) {
  try {
    contracts.controller = new ethers.Contract(
      addresses.controller,
      getABI(controllerABI),
      wallet
    );
    console.log('✅ Minting Controller contract initialized:', addresses.controller);
  } catch (e) {
    console.error('❌ Failed to initialize Minting Controller:', e.message);
  }
} else if (addresses.controller && !controllerABI) {
  console.warn('⚠️  Controller address found but ABI missing');
}

console.log(''); // Empty line for readability

// Export both addresses and contract instances
module.exports = { addresses, contracts };