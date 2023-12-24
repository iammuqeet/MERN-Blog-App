import Navbar from "./layouts/Navbar/";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login/";
import Register from "./pages/Register/";
import Home from "./pages/Home/";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
