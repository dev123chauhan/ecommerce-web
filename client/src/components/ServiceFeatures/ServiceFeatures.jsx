import { features } from "../../lib/serviceFeatures";
const ServiceFeature = ({ img, title, description }) => (
  <div className="flex flex-col items-center text-center">
    <div className="relative inline-flex items-center justify-center w-20 h-20 mb-4">
      <div className="absolute inset-0 bg-gray-200 rounded-full dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-400"></div>
      <div className="relative secondaryColor rounded-full p-4">
        <img src={img} className="w-8 h-8 text-white" alt={title} />
      </div>
    </div>
    <h3 className="text-lg font-bold mb-2">{title}</h3>
    <p className="text-sm">{description}</p>
  </div>
);

const ServiceFeatures = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-10">
      {features.map((feature, index) => (
        <ServiceFeature key={index} {...feature} />
      ))}
    </div>
  );
};

export default ServiceFeatures;
