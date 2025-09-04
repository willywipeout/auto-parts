import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./components/user/login";
import Pos from "./components/Pos";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Pos />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
