import { Route, Routes, useLocation } from "react-router-dom";
import ScrollToTop from "react-scroll-to-top";
import { FaArrowUp } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { checkAuthentication } from './redux/action/AuthAction';
import { useEffect } from "react";
import ThemeContextProvider from "./context/ThemeContextProvider";
import { Toaster } from "sonner";
import { AnimatePresence } from "framer-motion";
import PageTransition from "./animation/PageTransition";
import Layout from "./Layout/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import NotFound from "./pages/NotFound";
import Shop from "./pages/Shop";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";
import Faq from "./pages/Faq";
import Billing from "./pages/Billing";
import Order from "./pages/Order";
import Review from "./pages/Review";
import ProductDetail from "./pages/ProductDetail";
import Register from "./pages/Register";
import Login from "./pages/Login";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
export default function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkAuthentication());
  }, [dispatch]);
  const location = useLocation();
  useEffect(() => {
    const path = location.pathname;
    let pageTitle = "Ecommerce Webapp"; 

    switch (path) {
      case "/":
        pageTitle = "Home | ShopVibe";
        break;
      case "/shop":
        pageTitle = "Shop | ShopVibe";
        break;
      case "/about":
        pageTitle = "About | ShopVibe";
        break;
      case "/contact":
        pageTitle = "Contact | ShopVibe";
        break;
      case "/login":
        pageTitle = "Login | ShopVibe";
        break;
      case "/signup":
        pageTitle = "Register | ShopVibe";
        break;
      default:
        pageTitle = "ShopVibe";
    }

    document.title = pageTitle;
  }, [location]);
  return (
    <>
     <Toaster color="green" position="bottom-right"/>
    <ThemeContextProvider>
      <ScrollToTop className="scrollToTop" smooth component={<FaArrowUp className="upArrow"/>}/>
      <AnimatePresence mode="wait">
      <Routes>
        <Route path="/" element={<Layout><PageTransition><Home /></PageTransition></Layout>}/>
        <Route path="/contact" element={<Layout><Contact /></Layout>}/>
        <Route path="/about" element={<Layout><About/></Layout>}/>
        <Route path="/signup" element={<Register />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/cart" element={<Layout><PrivateRoute element={Cart} /></Layout>}/>
        <Route path="/billing" element={<Layout><PrivateRoute element={Billing} /></Layout>}/>
        <Route path="/wishlist" element={<Layout><PrivateRoute element={Wishlist} /></Layout>}/>
        <Route path="/product/:id" element={<Layout><ProductDetail /></Layout>} />
        <Route path="*" element={<Layout><NotFound /></Layout>}/>
        <Route path="/order" element={<Layout><PrivateRoute element={Order} /></Layout>}/>
        <Route path="/shop" element={<Layout><Shop /></Layout>}/>
        <Route path="/privacy" element={<Layout><PrivacyPolicy /></Layout>}/>
        <Route path="/terms" element={<Layout><Terms /></Layout>}/>
        <Route path="/faq" element={<Layout><Faq /></Layout>}/>
        <Route path="/review" element={<Layout><PrivateRoute element={Review} /></Layout>}/>
      </Routes>
      </AnimatePresence>
    </ThemeContextProvider>
    </>
  )
}
