import Card from "../../common/Card";
export default function FlashSaleProduct({
  products,
  isLoading,
  scrollContainerRef,
  handleAddToCart,
  handleFavoriteClick,
  handleViewDetails,
  handleProductClick,
  isInWishlist, 
}) {
  const skeletons = Array(6).fill(0);

  return (
    <div
      ref={scrollContainerRef}
      className="flex overflow-x-auto gap-4 sm:gap-6 pb-4 scrollbar-hide scroll-smooth"
    >
      {isLoading
        ? skeletons.map((_, i) => (
            <div
              key={`skeleton-${i}`}
              className="flex-none w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] xl:w-[calc(25%-16px)]"
            >
              <Card loading={true} />
            </div>
          ))
        : products.map((product) => (
            <div
              key={product._id}
              className="flex-none w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] xl:w-[calc(25%-16px)]"
            >
              <Card
                product={product}
                showDiscount
                showAddToCart
                onAddToCart={handleAddToCart}
                onToggleWishlist={handleFavoriteClick}
                onViewDetails={handleViewDetails}
                onProductClick={handleProductClick}
                isInWishlist={isInWishlist(product._id)}
              />
            </div>
          ))}
    </div>
  );
}
