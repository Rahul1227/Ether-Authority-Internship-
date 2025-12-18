import { useState } from "react";

function ApiFetch() {
  const [url, setUrl] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // handling api call
  const fetchData = () => {
    if (url.trim() === "") {
      setError("API url cannot be empty");
      return;
    }

    setLoading(true);
    setError("");
    setData(null);

    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Request failed with status " + res.status);
        }
        return res.json();
      })
      .then((result) => {
        setData(result);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  return (
    <div className="page">
      <h3>API Fetch</h3>

      <input
        type="text"
        placeholder="Enter API URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button onClick={fetchData}>Fetch</button>

      {loading && <p>Loading...</p>}

      {error && <p className="error">{error}</p>}

      {!loading && !error && data && (
        <div className="api-result">
          {Array.isArray(data) ? (
            <ul>
              {data.map((item, i) => (
                <li key={i}>
                  {item.name ? item.name : JSON.stringify(item)}
                </li>
              ))}
            </ul>
          ) : (
            <pre>{JSON.stringify(data, null, 2)}</pre>
          )}
        </div>
      )}
    </div>
  );
}

export default ApiFetch;
