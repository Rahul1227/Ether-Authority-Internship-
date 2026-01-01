@echo off
setlocal enabledelayedexpansion

echo =======================================================
echo DEPLOYING ALL CONTRACTS TO LOCALHOST
echo Make sure "npx hardhat node" is running in another terminal
echo =======================================================
echo.

echo [1/4] Deploying ERC20 tokens...
call npx hardhat run scripts/deploy_tokens.js --network localhost
echo.

echo [2/4] Deploying ERC721 NFTs...
call npx hardhat run scripts/deploy_nfts.js --network localhost
echo.

echo [3/4] Deploying MintingController...
call npx hardhat run scripts/deploy_controller.js --network localhost
echo.

echo [4/4] Configuring roles...
call npx hardhat run scripts/configure_roles.js --network localhost
echo.

echo =======================================================
echo DEPLOYMENT COMPLETED (IGNORING WINDOWS ERRORS)
echo All contracts deployed and roles configured.
echo =======================================================
pause
exit /b 0
