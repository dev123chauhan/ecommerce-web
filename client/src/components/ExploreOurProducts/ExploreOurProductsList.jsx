import Card from "../../common/Card";
export default function ExploreOurProductList({
  products,
  loading,
  error,
  itemsPerPage,
  page,
  pages,
  onAddToCart,
  onToggleWishlist,
  onViewDetails,
  onProductClick,
  isInWishlist,
}) {
  if (error) {
    return (
      <div className="border border-[#db4444] text-[#db4444] px-4 py-3 rounded mb-4">
        Error: {error}
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {loading
          ? [...Array(itemsPerPage)].map((_, index) => (
              <Card key={`skeleton-${index}`} loading={true} />
            ))
          : products?.map((product) => (
              <Card 
                key={product._id || product.id} 
                product={product}
                loading={false}
                showAddToCart={true}    
                onAddToCart={onAddToCart}
                onToggleWishlist={onToggleWishlist}
                onViewDetails={onViewDetails}
                onProductClick={onProductClick}
                isInWishlist={isInWishlist(product._id || product.id)}
              />
            ))}
      </div>
      
      {!loading && products.length > 0 && (
        <div className="flex justify-center items-center mt-6 text-gray-600">
          <span className="text-sm">
            Page {page} of {pages}
          </span>
        </div>
      )}
    </>
  );
}