import { Link } from "react-router-dom";
import aboutImage from "../../assets/aboutimage.png"
const AboutContent = () => {
  return (
    <div className="container mx-auto">
      <nav>
        <ul className="flex space-x-4">
          <li><Link to="/" className="">Home</Link></li>
          <li><Link to="" className="font-bold">About</Link></li>
        </ul>
      </nav>
      
      <div className="flex flex-col md:flex-row items-center md:items-start space-y-8 md:space-y-0 md:space-x-8">
        <div className="w-full md:w-1/2">
          <h1 className="text-4xl font-bold mb-4">Our Story</h1>
          <p className="mb-4">
            Founded in 2010, ShopVibe is premier online shopping
            experience with an intuitive platform. Supported by wide range of tailored 
            marketing, data and service solutions, ShopVibe has 10000 sellers 
            and 200 brands serving millions of customers across the region.
          </p>
          <p className="">
          ShopVibe has more than 1000 products to offer, growing at a
            very fast rate. ShopVibe offers a diverse assortment in categories
            ranging from consumer goods to electronics and more.
          </p>
        </div>
        
        <div className="w-full md:w-1/2">
          <img 
            src={aboutImage}
            alt="Happy shoppers" 
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default AboutContent;