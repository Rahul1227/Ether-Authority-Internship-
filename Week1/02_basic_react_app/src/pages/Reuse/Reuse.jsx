import CommonCard from "../../components/CommonCard/CommonCard";

function Reuse() {
  return (
    <div className="page">
      <h3>Component Reuse</h3>

      <div className="card-wrap">
        <CommonCard title="React" text="Reusable UI component" />
        <CommonCard title="Props" text="Data passed to components" />
      </div>
    </div>
  );
}

export default Reuse;
