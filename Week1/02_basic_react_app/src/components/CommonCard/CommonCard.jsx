import "./CommonCard.css";

function CommonCard({ title, text }) {
  return (
    <div className="card">
      <h4>{title}</h4>
      <p>{text}</p>
    </div>
  );
}

export default CommonCard;
