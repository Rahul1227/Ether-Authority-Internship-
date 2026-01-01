import { useEffect, useState } from "react";

export default function NFTList({ type, title, address }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const load = async () => {
      const res = await fetch(`http://localhost:5000/nft/${type}/${address}`);
      const json = await res.json();
      setItems(json.tokens || []);
    };
    if (address) load();
  }, [type, address]);

  return (
    <div className="dash-card">
      <div className="card-heading">{title}</div>

      {items.length === 0 && <div className="token-item">No {type} yet</div>}

      {items.map((id, i) => (
        <div key={i} className="token-item">
          Token #{id}
        </div>
      ))}
    </div>
  );
}
