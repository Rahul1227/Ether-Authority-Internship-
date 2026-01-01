const API = "http://localhost:5000";

export async function mintReward(wallet, amount) {
  const res = await fetch(`${API}/mint/reward/${wallet}/${amount}`, { method: "POST" });
  return res.json();
}

export async function mintTask(wallet, amount, taskId) {
  const res = await fetch(`${API}/mint/task/${wallet}/${amount}/${taskId}`, { method: "POST" });
  return res.json();
}

export async function mintCertificate(wallet, cid) {
  const res = await fetch(`${API}/mint/certificate/${wallet}/${cid}`, { method: "POST" });
  return res.json();
}

export async function mintBadge(wallet, cid) {
  const res = await fetch(`${API}/mint/badge/${wallet}/${cid}`, { method: "POST" });
  return res.json();
}

export async function getBalances(wallet) {
  const res = await fetch(`${API}/balance/all/${wallet}`);
  return res.json();
}

export async function getNFTs(wallet) {
  const res = await fetch(`${API}/nft/all/${wallet}`);
  return res.json();
}
