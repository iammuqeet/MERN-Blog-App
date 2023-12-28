import { createContext, useState, useEffect } from "react";
import Navbar from "./layouts/Navbar/";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login/";
import Register from "./pages/Register/";
import Home from "./pages/Home/";
import CreateBlog from "./pages/Blog/CreateBlog";

import { UserContextProvider } from "./UserContext";
import Layout from "./layouts/";
import DisplayBlog from "./pages/Blog/DisplayBlog";

export const UserContext = createContext({});

function App() {
  const [userData, setUserData] = useState({});
  return (
    <div>
      <UserContextProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/blog/create" element={<CreateBlog />} />
            <Route path="/blog/:id" element={<DisplayBlog />} />
          </Route>
        </Routes>
      </UserContextProvider>
    </div>
  );
}

export default App;
