import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  // handling increase
  const inc = () => {
    setCount(count + 1);
  };

  // handling decrease
  const dec = () => {
    setCount(count - 1);
  };

  return (
    <div className="page counter-page">
      <h3>Counter App</h3>

      <div className="big-count">{count}</div>

      <div className="btn-group">
        <button onClick={inc}>Increase</button>
        <button onClick={dec}>Decrease</button>
      </div>
    </div>
  );
}

export default Counter;
