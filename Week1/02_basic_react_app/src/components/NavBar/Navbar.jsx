import { Link } from "react-router-dom";
import "./NavBar.css";

function NavBar() {
  return (
    <div className="nav">
      {/* creating navigation links */}
      <Link to="/" className="nav-link">Home</Link>
      <Link to="/counter" className="nav-link">Counter</Link>
      <Link to="/form" className="nav-link">Input Form</Link>
      <Link to="/todo" className="nav-link">Todo</Link>
      <Link to="/api" className="nav-link">API Fetch</Link>
      <Link to="/reuse" className="nav-link">Reuse</Link>
    </div>
  );
}

export default NavBar;
