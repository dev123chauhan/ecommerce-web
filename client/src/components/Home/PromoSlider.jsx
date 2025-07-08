import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import iphone from "../../assets/i-phone.png"
import saleimage from "../../assets/saleimage.webp"
const PromoSlider = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const promoContent = [
    {
      title: "iPhone 14 Series",
      description: "Up to 10% off Voucher",
      imagePath: iphone
    },
    {
      title: "iPhone 14 Pro",
      description: "Special Launch Offer",
      imagePath: saleimage
    },
    {
      title: "iPhone 14 Pro Max",
      description: "Limited Time Deal",
      imagePath: iphone
    },
    {
      title: "iPhone 14 Mini",
      description: "Exclusive Discount",
      imagePath: saleimage
    },
    {
      title: "AirPods Pro",
      description: "Free with iPhone 14",
      imagePath: iphone
    }
  ];

  return (
    <div className="w-full md:w-3/4 bg-black text-white p-8">
      <div className="relative h-64 md:h-96">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0 transition-all duration-500 ease-in-out">
            <svg 
              className="w-8 h-8 mb-2" 
              viewBox="0 0 24 24" 
              fill="white"
            >
              <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z"/>
            </svg>
            <h2 className="text-2xl md:text-4xl font-bold mb-2 transition-all duration-500">
              {promoContent[activeSlide].title}
            </h2>
            <p className="text-3xl md:text-5xl font-bold mb-4 transition-all duration-500">
              {promoContent[activeSlide].description}
            </p>
            <button className="inline-flex items-center text-white hover:text-gray-300 transition-colors duration-300">
              Shop Now <ArrowRight className="ml-2" size={20} />
            </button>
          </div>
          <div className="mt-4 md:mt-0 transition-all duration-500 ease-in-out transform hover:scale-105">
            <img 
              src={promoContent[activeSlide].imagePath} 
              alt={promoContent[activeSlide].title}
              className="w-64 md:w-96 transition-opacity duration-500"
            />
          </div>
        </div>


        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {promoContent.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === activeSlide ? 'bg-white w-4' : 'bg-gray-500'
              }`}
              onClick={() => setActiveSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PromoSlider;