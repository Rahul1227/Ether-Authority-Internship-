import { useEffect, useState } from "react";

export default function TokenBalance({ address }) {
  const [reward, setReward] = useState("0");
  const [task, setTask] = useState("0");

  useEffect(() => {
    const load = async () => {
      setReward((await (await fetch(`http://localhost:5000/balance/reward/${address}`)).json())?.balance || 0);
      setTask((await (await fetch(`http://localhost:5000/balance/task/${address}`)).json())?.balance || 0);
    };
    if (address) load();
  }, [address]);

  return (
    <div className="dash-card">
      <div className="card-heading">Your Tokens</div>
      <div className="token-item">Reward Tokens: {reward}</div>
      <div className="token-item">Task Tokens: {task}</div>
    </div>
  );
}
