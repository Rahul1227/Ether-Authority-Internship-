import { useEffect, useState } from "react";
import CertificateImg from "../assets/certificate.png"; // dummy image

// ---- dummy placeholder certificates (CID strings) ----
const DUMMY_CERTS = [
  "QmDummyCID12345certificate001",
  "QmDummyCID67890certificate002",
  "QmDummyCIDabcdecertificate003"
];

export default function CertificateList({ address, refresh }) {
  const [certificates, setCertificates] = useState([]);

  const load = async () => {
    try {
      const res = await fetch(`http://localhost:5000/nft/certificates/${address}`);
      const { tokens } = await res.json();

      if (tokens && tokens.length > 0) {
        setCertificates(tokens);
      } else {
        // if no real certificates → show dummy placeholders
        setCertificates(DUMMY_CERTS);
      }

    } catch (err) {
      console.error("Certificate load error:", err);
      // fallback on error → show dummy placeholders
      setCertificates(DUMMY_CERTS);
    }
  };

  useEffect(() => {
    if (address) load();
  }, [address, refresh]);

  return (
    <div className="dash-card">
      <h2 className="card-heading">Your Certificates</h2>

      <div className="nft-grid">
        {certificates.map((cid, index) => (
          <div className="nft-card" key={index}>
            <img src={CertificateImg} alt="certificate" className="nft-img" />

            <div className="nft-id">Certificate #{index + 1}</div>
            <div className="nft-cid">{cid}</div>

            <a
              href={`https://ipfs.io/ipfs/${cid}`}
              target="_blank"
              rel="noreferrer"
              className="nft-btn"
            >
              View on IPFS
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
