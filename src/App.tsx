import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Collection from "./components/collection";
import Footer from "./components/footer";
import Home from "./components/home";
import Navbar from "./components/navbar";
import LoginSignup from "./components/loginsignup";

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/Login" element={<LoginSignup />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
