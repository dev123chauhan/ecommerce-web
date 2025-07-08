import { Truck, Headphones, Shield } from 'lucide-react';
import PropTypes from 'prop-types';

const ServiceFeature = ({ icon: Icon, title, description }) => (
  <div className="flex flex-col items-center text-center">
    <div className="relative inline-flex items-center justify-center w-20 h-20 mb-4">
      <div className="absolute inset-0 bg-gray-200 rounded-full dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-400"></div>
      <div className="relative bg-black rounded-full p-4 ">
        <Icon className="w-8 h-8 text-white" />
      </div>
    </div>
    <h3 className="text-lg font-bold mb-2">{title}</h3>
    <p className="text-sm">{description}</p>
  </div>
);


ServiceFeature.propTypes = {
  icon: PropTypes.elementType.isRequired, 
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

const ServiceFeatures = () => {
  const features = [
    {
      icon: Truck,
      title: "FREE AND FAST DELIVERY",
      description: "Free delivery for all orders over $140",
    },
    {
      icon: Headphones,
      title: "24/7 CUSTOMER SERVICE",
      description: "Friendly 24/7 customer support",
    },
    {
      icon: Shield,
      title: "MONEY BACK GUARANTEE",
      description: "We return money within 30 days",
    },
  ];

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-10">
        {features.map((feature, index) => (
          <ServiceFeature key={index} {...feature} />
        ))}
      </div>
    </>
  );
};

export default ServiceFeatures;
