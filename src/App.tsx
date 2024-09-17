import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Collection from "./components/collection";
import Footer from "./components/footer";
import Home from "./components/home";
import Navbar from "./components/navbar";
import LoginSignup from "./components/loginsignup";
import Product from "./components/product";
import ScrollToTop from "./context/ScrollToTop";
import AboutUs from "./components/aboutus";
import Checkout from "./components/checkout";

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/Login" element={<LoginSignup />} />
          <Route path="/Product" element={<Product />} />
          <Route path="/AboutUs" element={<AboutUs />} />
          <Route path="/Checkout" element={<Checkout />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
