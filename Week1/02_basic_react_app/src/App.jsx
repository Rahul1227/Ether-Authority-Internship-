import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";

import Home from "./pages/Home/Home";
import Counter from "./pages/Counter/Counter";
import InputForm from "./pages/InputForm/InputForm";
import Todo from "./pages/Todo/Todo";
import ApiFetch from "./pages/ApiFetch/ApiFetch";
import Reuse from "./pages/Reuse/Reuse";

function App() {
  return (
    <BrowserRouter>
      {/* showing navbar on top */}
      <NavBar />

      {/* wrapping pages to control layout */}
      <div className="app-wrap">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/counter" element={<Counter />} />
          <Route path="/form" element={<InputForm />} />
          <Route path="/todo" element={<Todo />} />
          <Route path="/api" element={<ApiFetch />} />
          <Route path="/reuse" element={<Reuse />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
