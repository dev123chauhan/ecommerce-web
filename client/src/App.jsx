import { Route, Routes, useLocation } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Billing from "./components/Billing/Billing";
import ScrollToTop from "react-scroll-to-top";
import { FaArrowUp } from "react-icons/fa";
import Order from "./components/Order/Order";
import { useDispatch } from 'react-redux';
import { checkAuthentication } from './action/AuthAction';
import { useEffect } from "react";
import ThemeContextProvider from "./context/ThemeContextProvider";
import PrivacyPolicy from "./components/PrivacyPolicy/PrivacyPolicy";
import Terms from "./components/Terms/Terms";
import Faq from "./components/Faq/Faq";
import Review from "./components/Review/Review";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Verify from "./components/Verify/Verify";
import Otp from "./components/Verify/Otp";
import { Toaster } from "sonner";
import { AnimatePresence } from "framer-motion";
import PageTransition from "./animation/PageTransition";
import Home from "./pages/Home/Home";
import Contact from "./pages/Contact/Contact";
import About from "./pages/About/About";
import Account from "./pages/Account/Account";
import Cart from "./pages/Cart/Cart";
import Wishlist from "./pages/Wishlist/Wishlist";
import ProductDetail from "./components/ProductDetail/ProductDetail";
import NotFound from "./pages/NotFound/NotFound";
import Shop from "./pages/Shop/Shop";
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
        <Route path="/signup" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/account" element={<Layout><PrivateRoute element={Account} /></Layout>}/>
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
        <Route path="/verify" element={<Verify />}/>
        <Route path="/otp" element={<Otp />}/>
      </Routes>
      </AnimatePresence>
    </ThemeContextProvider>
    </>
  )
}
