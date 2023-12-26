import { createContext, useState } from "react";
import Navbar from "./layouts/Navbar/";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login/";
import Register from "./pages/Register/";
import Home from "./pages/Home/";
import CreateBlog from "./pages/Blog/CreateBlog";

export const UserContext = createContext({});

function App() {
  const [userData, setUserData] = useState({});
  return (
    <div>
      <UserContext.Provider value={[userData, setUserData]}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/register" element={<Register />} />
          <Route path="/blog/create" element={<CreateBlog />} />
        </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;
