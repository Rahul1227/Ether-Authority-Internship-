import { useWallet } from "../context/WalletContext";

export default function ConnectWallet() {
  const { address, connectWallet } = useWallet();

  return (
    <div className="connect-box">
      {address ? (
        <span className="wallet-tag">
          Connected: {address.slice(0, 6)}...{address.slice(-4)}
        </span>
      ) : (
        <button className="btn" onClick={connectWallet}>
          Connect Wallet
        </button>
      )}
    </div>
  );
}
