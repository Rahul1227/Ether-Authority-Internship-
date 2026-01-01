import { useWallet } from "../context/WalletContext";
import TokenBalance from "../components/TokenBalance";
import CertificateList from "../components/CertificateList";   // ⬅ add this
import NFTList from "../components/NFTList";                   // badges only
import "./dashboard.css";

export default function Dashboard() {
  const { address } = useWallet();

  if (!address) {
    return (
      <div className="dash-wrapper">
        <h1 className="dash-title">Dashboard</h1>
        <div className="dash-card center-msg">
          Please connect your wallet to view your dashboard.
        </div>
      </div>
    );
  }

  return (
    <div className="dash-wrapper">
      <h1 className="dash-title">Dashboard</h1>

      <div className="wallet-section">
        <span>Connected Wallet:</span>
        <div className="wallet-box">{address}</div>
      </div>

      <div className="dash-grid">
        <TokenBalance address={address} />

        {/* ⬇ REPLACE NFTList for certificates */}
        <CertificateList address={address} />

        {/* ⬇ KEEP badges placeholder */}
        <NFTList
          type="badges"
          title="Your Badges"
          address={address}
        />
      </div>
    </div>
  );
}
