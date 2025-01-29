import React from "react";
import Home from "./Home";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import About from "./About";
import Contact from "./Contact";
import Signup from "./Signup";
import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <nav>
          <Link to="/Home">Home</Link> |
          <Link to="/About">About</Link> |
          <Link to="/Contact">Contact</Link>|
          <Link to="/Signup">Sign up</Link>
        </nav>
        <Routes>
          <Route path="/Home" element={<Home />} />
          <Route path="/About" element={<About />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/Signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}


export default App;
