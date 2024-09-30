import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Collection from "./components/collection";
import Footer from "./components/footer";
import Home from "./components/home";
import Navbar from "./components/navbar";
import LoginSignup from "./components/loginsignup";
import Product from "./components/product";
import ScrollToTop from "./contexts/ScrollToTop";
import AboutUs from "./components/aboutus";
import Checkout from "./components/checkout";
import AdminPanel from "./admin/adminpanel";
import AdminLogin from "./admin/adminlogin";
import UserProfile from "./components/userprofile";
import ViewAddresses from "./components/viewaddresses";
import { AuthProvider } from './contexts/AuthContext';
import { ProductProvider } from './contexts/ProductContext';
import { CartProvider } from './contexts/CartContext';
import { OrderProvider } from './contexts/OrderContext';
import { CheckoutProvider } from './contexts/CheckoutContext';
import { UIProvider } from './contexts/UIContext';
import { SingleProductProvider } from './contexts/SingleProductContext';
import { CategoryProvider } from './contexts/CategoryContext'; 

function App() {
  return (
    <AuthProvider>
      <ProductProvider>
        <CartProvider>
          <OrderProvider>
            <CheckoutProvider>
              <UIProvider>
                <SingleProductProvider>
                  <CategoryProvider> 
                    <Router>
                      <ScrollToTop />
                      <Navbar />
                      <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/collection" element={<Collection />} />
                        <Route path="/Login" element={<LoginSignup />} />
                        <Route path="/Product/:id" element={<Product />} />
                        <Route path="/AboutUs" element={<AboutUs />} />
                        <Route path="/Checkout" element={<Checkout />} />
                        <Route path="/AdminPanel" element={<AdminPanel />} />
                        <Route path="/admin-login" element={<AdminLogin />} />
                        <Route path="/UserProfile" element={<UserProfile />} />
                        <Route path="/ViewAddresses" element={<ViewAddresses />} />
                      </Routes>
                      <Footer />
                    </Router>
                  </CategoryProvider>
                </SingleProductProvider>
              </UIProvider>
            </CheckoutProvider>
          </OrderProvider>
        </CartProvider>
      </ProductProvider>
    </AuthProvider>
  );
}

export default App;
