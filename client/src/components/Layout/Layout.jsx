import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import Header from '../Home/Header';
import Footer from '../Home/Footer';

const AnnouncementBanner = React.lazy(() => import('./AnnouncmentBanner'));

const Layout = ({ children }) => {
  const location = useLocation();
  const [isBannerVisible, setIsBannerVisible] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Function to handle banner visibility state
  const handleBannerVisibilityChange = (isVisible) => {
    setIsBannerVisible(isVisible);
  };

  return (
    <div className="min-h-screen">
      {/* Fixed position wrapper for announcement + header */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <React.Suspense fallback={<div className="h-8 bg-black" />}>
          <AnnouncementBanner onVisibilityChange={handleBannerVisibilityChange} />
        </React.Suspense>
        <Header />
      </div>
      
      {/* Main content with dynamic padding based on banner visibility */}
      <div className={`${isBannerVisible ? 'pt-[55px]' : 'pt-[20px]'}`}>
        <main>{children}</main>
        <Footer />
      </div>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;



