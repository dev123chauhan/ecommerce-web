import CategoryList from "./CategoryList";
import ProductSlider from "./ProductSlider";

const Banner = () => {
  return (
    <div className="flex flex-col md:flex-row banner relative">
      <div className="md:w-1/5 flex-shrink-0">
        <CategoryList />
      </div>
      <div className="md:w-3/4 flex-grow">
        <ProductSlider />
      </div>
    </div>
  );
};

export default Banner;