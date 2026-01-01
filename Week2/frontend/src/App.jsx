import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { WalletProvider } from "./context/WalletContext";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import AdminPanel from "./pages/AdminPanel";

import "./styles/global.css";

export default function App() {
  return (
    <WalletProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </Router>
    </WalletProvider>
  );
}
