import noproductfound from "../../../public/assets/Not-found.gif";
import Button from "../../common/Button";
import Card from "../../common/Card";
export default function BestSellingProducts({
  products,
  allProducts,
  isLoading,
  error,
  showAll,
  viewAllButtonRef,
  onAddToCart,
  onToggleWishlist,
  onViewDetails,
  onProductClick,
  isInWishlist,
  onShowLess,
  onViewAll,
}) {
  const skeletons = Array(3).fill(0);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skeletons.map((_, index) => (
          <Card key={`skeleton-${index}`} loading={true} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 text-red-500 p-4 mb-6 rounded">
        Error: {error.toString()}
      </div>
    );
  }

  if (allProducts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center px-4 rounded-lg shadow-sm">
        <img
          src={noproductfound}
          alt="No products found"
          className="w-full max-w-md mx-auto"
        />
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card
            key={product._id}
            product={product}
            loading={false}
            showDiscount={false}
            showAddToCart={true}
            onAddToCart={onAddToCart}
            onToggleWishlist={onToggleWishlist}
            onViewDetails={onViewDetails}
            onProductClick={onProductClick}
            isInWishlist={isInWishlist(product._id)}
          />
        ))}
      </div>

      {allProducts.length > 3 && (
        <div className="flex items-center justify-center m-10">
          <Button
            ref={viewAllButtonRef}
            text={showAll ? "Show Less" : "View More"}
            onClick={showAll ? onShowLess : onViewAll}
            className="primaryColor text-white py-3"
          />
        </div>
      )}
    </>
  );
}

