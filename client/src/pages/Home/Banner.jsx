import CategoryList from "./CategoryList";
import ProductSlider from "./ProductSlider";
const Banner = () => {
  return (
    <div className="flex flex-col lg:flex-row banner relative">
      <div className="order-1 lg:order-2 lg:w-3/4 flex-grow">
        <ProductSlider />
      </div>
      <div className="order-2 lg:order-1 lg:w-1/5 flex-shrink-0">
        <CategoryList />
      </div>
    </div>
  );
};

export default Banner;