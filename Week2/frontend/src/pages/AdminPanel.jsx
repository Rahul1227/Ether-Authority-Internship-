import { useState, useEffect } from "react";
import { useWallet } from "../context/WalletContext";
import { mintReward, mintTask, mintCertificate, mintBadge } from "../api/backend";
import "./AdminPanel.css"

export default function AdminPanel() {
  const { address } = useWallet(); // 🔥 take wallet from context
  const [wallet, setWallet] = useState("");
  const [amount, setAmount] = useState("");
  const [cid, setCid] = useState("");
  const [taskId, setTaskId] = useState("");
  const [msg, setMsg] = useState("");

  // 🔥 Auto-fill wallet whenever MetaMask connects
  useEffect(() => {
    if (address) setWallet(address);
  }, [address]);

  // 🔍 Fix validation
  const validate = (fields) => {
    for (const field of fields) {
      const [value, err] = field;
      if (!value || value.trim() === "") {
        setMsg(err);
        return false;
      }
    }
    setMsg("");
    return true;
  };

  const handleReward = async () => {
    if (!validate([[wallet, "Wallet required"], [amount, "Amount required"]])) return;
    try {
      const res = await mintReward(wallet, amount);
      setMsg("Reward minted successfully → " + JSON.stringify(res));
    } catch (err) { setMsg(err.message); }
  };

  const handleTask = async () => {
    if (!validate([[wallet, "Wallet required"], [amount, "Amount required"], [taskId, "Task ID required"]])) return;
    try {
      const res = await mintTask(wallet, amount, taskId);
      setMsg("Task token minted → " + JSON.stringify(res));
    } catch (err) { setMsg(err.message); }
  };

  const handleCertificate = async () => {
    if (!validate([[wallet, "Wallet required"], [cid, "CID required"]])) return;
    try {
      const res = await mintCertificate(wallet, cid);
      setMsg("Certificate minted → " + JSON.stringify(res));
    } catch (err) { setMsg(err.message); }
  };

  const handleBadge = async () => {
    if (!validate([[wallet, "Wallet required"], [cid, "CID required"]])) return;
    try {
      const res = await mintBadge(wallet, cid);
      setMsg("Badge minted → " + JSON.stringify(res));
    } catch (err) { setMsg(err.message); }
  };

  return (
    <div className="admin-container">
      <h1 className="page-title">Admin Panel</h1>

      <input className="admin-input" value={wallet} onChange={e => setWallet(e.target.value)} placeholder="Wallet" />
      <input className="admin-input" value={amount} onChange={e => setAmount(e.target.value)} placeholder="Amount" />
      <input className="admin-input" value={cid} onChange={e => setCid(e.target.value)} placeholder="CID (certificate / badge)" />
      <input className="admin-input" value={taskId} onChange={e => setTaskId(e.target.value)} placeholder="Task ID" />

      <button className="admin-btn" onClick={handleReward}>Mint Reward</button>
      <button className="admin-btn" onClick={handleTask}>Mint Task Token</button>
      <button className="admin-btn" onClick={handleCertificate}>Mint Certificate</button>
      <button className="admin-btn" onClick={handleBadge}>Mint Badge</button>

      {msg && <div className="admin-error">{msg}</div>}
    </div>
  );
}
