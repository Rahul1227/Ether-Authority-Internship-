import { Link } from "react-router-dom";
import "./../styles/components.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <h2 className="nav-title">Intern Dashboard</h2>

      <div className="nav-links">
        <Link to="/">Dashboard</Link>
        <Link to="/admin">Admin</Link>
      </div>
    </nav>
  );
}
