import { createContext, useContext, useState, useEffect } from "react";
import { ethers } from "ethers";

const WalletContext = createContext();
export const useWallet = () => useContext(WalletContext);

export const WalletProvider = ({ children }) => {
  const [address, setAddress] = useState(null);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);

  const connectWallet = async () => {
    if (!window.ethereum) return alert("Install MetaMask");

    try {
      const p = new ethers.providers.Web3Provider(window.ethereum);
      await p.send("eth_requestAccounts", []);
      const s = p.getSigner();
      const addr = await s.getAddress();

      const net = await p.getNetwork();
      if (net.chainId !== 11155111) return alert("Switch to Sepolia");

      setProvider(p);
      setSigner(s);
      setAddress(addr);
      localStorage.setItem("walletConnected", "true");
    } catch (err) {
      console.log(err);
    }
  };

  const disconnectWallet = () => {
    setAddress(null);
    setProvider(null);
    setSigner(null);
    localStorage.removeItem("walletConnected");
  };

  useEffect(() => {
    if (localStorage.getItem("walletConnected") === "true" && window.ethereum) {
      connectWallet();
    }
  }, []);

  return (
    <WalletContext.Provider value={{ address, provider, signer, connectWallet, disconnectWallet }}>
      {children}
    </WalletContext.Provider>
  );
};
