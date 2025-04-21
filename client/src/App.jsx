import { Route, Routes, useLocation } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import Contact from "./components/Contact/Contact";
import About from "./components/About/About";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Account from "./components/Account/Account";
import Cart from "./components/Cart/Cart";
import Billing from "./components/Billing/Billing";
import Wishlist from "./components/Wishlist/Wishlist";
import ProductDetail from "./components/ProductDetail/ProductDetail";
import NotFound from "./components/NotFound/NotFound";
import ScrollToTop from "react-scroll-to-top";
import { FaArrowUp } from "react-icons/fa";
import Order from "./components/Order/Order";
import { useDispatch } from 'react-redux';
import { checkAuthentication } from './action/AuthAction';
import { useEffect } from "react";
import Shop from "./components/Shop/Shop";
import ThemeContextProvider from "./context/ThemeContextProvider";
import PrivacyPolicy from "./components/PrivacyPolicy/PrivacyPolicy";
import Terms from "./components/Terms/Terms";
import FAQ from "./components/Faq/Faq";
import Review from "./components/Review/Review";
import MyCancellation from "./components/MyCancellation/MyCancellation";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Verify from "./components/Verify/Verify";
import Otp from "./components/Verify/Otp";
import { Toaster } from "sonner";
import { AnimatePresence } from "framer-motion";
import PageTransition from "./animation/PageTransition";
// import Verify from "./components/Verify/Verify";
export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuthentication());
  }, [dispatch]);

  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    let pageTitle = "Resume Builder"; // Default title

    switch (path) {
      case "/":
        pageTitle = "Home | ShopVibe";
        break;
      case "/features":
        pageTitle = "Features | ShopVibe";
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
      case "/register":
        pageTitle = "Register | ShopVibe";
        break;
      case "/dashboard":
        pageTitle = "dashboard | ShopVibe";
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
        <Route path="/" element={<Layout><PageTransition><Home/></PageTransition></Layout>}/>
        <Route path="/contact" element={<Layout><Contact/></Layout>}/>
        <Route path="/about" element={<Layout><About/></Layout>}/>
        <Route path="/signup" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/account" element={<Layout><PrivateRoute element={Account} /></Layout>}/>
        <Route path="/cart" element={<Layout><PrivateRoute element={Cart} /></Layout>}/>
        <Route path="/billing" element={<Layout><PrivateRoute element={Billing} /></Layout>}/>
        <Route path="/wishlist" element={<Layout><PrivateRoute element={Wishlist} /></Layout>}/>
        {/* <Route path="/product-detail" element={<Layout><ProductDetail /></Layout>}/> */}
        <Route path="/product/:id" element={<Layout><ProductDetail /></Layout>} />
        <Route path="*" element={<Layout><NotFound /></Layout>}/>
        <Route path="/order" element={<Layout><PrivateRoute element={Order} /></Layout>}/>
        <Route path="/productlist" element={<Layout><Shop /></Layout>}/>
        <Route path="/privacy" element={<Layout><PrivacyPolicy /></Layout>}/>
        <Route path="/terms" element={<Layout><Terms /></Layout>}/>
        <Route path="/faq" element={<Layout><FAQ /></Layout>}/>
        <Route path="/review" element={<Layout><PrivateRoute element={Review} /></Layout>}/>
        <Route path="/cancellation" element={<Layout><PrivateRoute element={MyCancellation} /></Layout>}/>
        <Route path="/verify" element={<Verify />}/>
        <Route path="/otp" element={<Otp />}/>
      </Routes>
      </AnimatePresence>
    </ThemeContextProvider>
    </>
  )
}
