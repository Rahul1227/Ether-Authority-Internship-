// src/utils/ethersHelper.js
import { useWallet } from "../context/WalletContext";

// This hook gives you signer & provider wherever needed
export const useEthersHelper = () => {
  const { signer, provider, address } = useWallet();

  const sendTx = async (txFunc) => {
    if (!signer) throw new Error("Wallet not connected");

    const tx = await txFunc(signer);
    await tx.wait();
    return tx.hash;
  };

  return { signer, provider, address, sendTx };
};
