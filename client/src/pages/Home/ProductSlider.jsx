import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchFeaturedProducts } from "../../slice/ProductBannerSlice";
import iphonelogo from "../../assets/iphonelogo.png";
import { Skeleton } from "antd";

const ProductSlider = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const dispatch = useDispatch();
  const { featuredProducts, error,loading } = useSelector(
    (state) => state.productBanner
  );
  useEffect(() => {
    dispatch(fetchFeaturedProducts());
  }, [dispatch]);

  useEffect(() => {
    let interval;
    if (isAutoPlaying && featuredProducts.length > 0) {
      interval = setInterval(() => {
        setActiveSlide((prev) => (prev + 1) % featuredProducts.length);
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, featuredProducts.length]);

  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  if (loading) {
    return (
      <div className="relative w-full bg-black overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative min-h-[300px] xs:min-h-[300px] sm:min-h-[350px] md:min-h-[450px]  py-8 sm:py-12 md:py-16">
            <div className="flex flex-col md:flex-row h-full items-center gap-6 sm:gap-8 md:gap-12 lg:gap-16">
              <div className="w-full md:w-1/2 space-y-6 text-center md:text-left">
                <Skeleton.Avatar
                  active
                  size={40}
                  shape="square"
                  className="mx-auto md:mx-0"
                />

                <Skeleton.Input
                  active
                  size="small"
                
                  className="mx-auto md:mx-0"
                />

                <Skeleton.Input
                  active
                  size="large"
                 
                  className="mx-auto md:mx-0"
                />

                <Skeleton.Input
                  active
                  size="large"
                 
                  className="mx-auto md:mx-0"
                />

                <Skeleton.Button
                  active
                  size="default"
                 
                  className="mx-auto md:mx-0"
                />
              </div>

              <div className="w-full md:w-1/2 flex justify-center items-center px-4 sm:px-6 md:px-8">
                <Skeleton.Image active  />
              </div>
            </div>

            <div className="flex justify-center space-x-2 sm:space-x-3 mt-6 md:mt-4">
              {[1, 2, 3, 4, 5].map((_, index) => (
                <Skeleton.Button
                  key={index}
                  active
                  size="small"
                  shape="circle"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[400px] bg-black">
        <div className="text-white text-center">
          <p className="text-xl">Something went wrong!</p>
          <p className="text-sm mt-2">{error}</p>
        </div>
      </div>
    );
  }

  if (featuredProducts.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[400px] bg-black">
        <div className="text-white text-center">
          <p className="text-xl">No featured products available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="relative min-h-[300px] xs:min-h-[350px] sm:min-h-[400px] md:min-h-[450px] py-8 sm:py-12 md:py-16"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
         
          <div className="flex flex-col md:flex-row h-full items-center gap-6 sm:gap-8 md:gap-12 lg:gap-16 mb-8 md:mb-12">
            <div className="w-full md:w-1/2 space-y-3 sm:space-y-4 md:space-y-6 text-center md:text-left">
              <div className="w-10 h-10 mx-auto md:mx-0 flex items-center space-x-2">
                <img
                  src={iphonelogo}
                  alt={featuredProducts[activeSlide].brand}
                  className="w-full object-contain"
                  onError={(e) => {
                    e.target.src = "/brands/placeholder.png";
                  }}
                />
                <div className="text-white text-sm sm:text-base md:text-lg font-medium  mt-3">
                  {featuredProducts[activeSlide].brand}
                </div>
              </div>

              <h2 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white transition-all duration-300">
                {featuredProducts[activeSlide].productName}
              </h2>

              <p className="sm:text-2xl md:text-md lg:text-md font-bold text-white transition-all duration-300">
                {featuredProducts[activeSlide].offer}
              </p>

              <div className="pt-2 sm:pt-4">
                <Link
                  onClick={() =>
                    window.open("https://www.apple.com/in/", "_blank")
                  }
                  className="inline-flex items-center justify-center md:justify-start text-white hover:text-gray-300 transition-all duration-300 group text-sm sm:text-base md:text-lg"
                >
                  Shop Now
                  <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            <div className="w-full md:w-1/2 flex justify-center items-center px-4 sm:px-6 md:px-8">
              <img
                src={featuredProducts[activeSlide].imagePath}
                alt={featuredProducts[activeSlide].productName}
                className="w-full max-w-[200px] xs:max-w-[250px] sm:max-w-[300px] md:max-w-[350px] lg:max-w-[400px] xl:max-w-[450px] 
                         object-contain transform transition-all duration-500 hover:scale-105"
                onError={(e) => {
                  e.target.src = "/placeholder-product.png";
                }}
              />
            </div>
          </div>

          {/* Dots indicator - positioned at bottom and always visible */}
          <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2">
            <div className="flex justify-center space-x-2 sm:space-x-3">
              {featuredProducts.map((_, index) => (
                <button
                  key={index}
                  className={`h-2 sm:h-3 rounded-full transition-all duration-300 
                    ${
                      index === activeSlide
                        ? "bg-red-500 w-4 sm:w-6"
                        : "bg-gray-500 hover:bg-gray-300 w-2 sm:w-3"
                    }`}
                  onClick={() => setActiveSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSlider;