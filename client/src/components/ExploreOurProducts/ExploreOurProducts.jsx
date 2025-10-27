import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { listProducts } from '../../redux/action/exploreProductAction';
import { toggleWishlistItem, fetchWishlist } from '../../redux/slice/wishlistSlice';
import { addToCart } from '../../redux/slice/cartSlice';
import ExploreOurProductsHeader from './ExploreOurProductsHeader';
import ExploreOurProductList from './ExploreOurProductsList';
import { useModal } from '../../context/ModalContext';
const ExploreOurProducts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { openModal } = useModal();
  
  const { loading: reduxLoading, error, products, pages } = useSelector((state) => state.productList);
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { items: wishlistItems } = useSelector((state) => state.wishlist);
  
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [displayProducts, setDisplayProducts] = useState([]);
  
  const itemsPerPage = 8;

  useEffect(() => {
    dispatch(listProducts(page, itemsPerPage));
  }, [dispatch, page]);

  useEffect(() => {
    if (user?.id && wishlistItems.length === 0) {
      dispatch(fetchWishlist(user.id));
    }
  }, [dispatch, user, wishlistItems.length]);

  useEffect(() => {
    if (!reduxLoading && products?.length > 0) {
      setLoading(true);
      
      const transformedProducts = products.map(product => ({
        ...product,
        id: product.id || product._id 
      }));
      
      const timer = setTimeout(() => {
        setDisplayProducts(transformedProducts);
        setLoading(false);
      }, 1500);  
      
      return () => clearTimeout(timer);
    }
  }, [reduxLoading, products]);

  const isInWishlist = (productId) => {
    return wishlistItems.some(
      (item) => item?.productId?._id === productId
    );
  };

  const handleAddToCart = async (product) => {
    if (!isAuthenticated) {
      openModal("Login");
      return;
    }

    try {
      await dispatch(
        addToCart({
          userId: user.id,
          product: {
            id: product._id || product.id,
            name: product.name,
            price: product.price,
            image: product.image,
          },
        })
      ).unwrap();
      toast.success("Item Added to Cart");
    } catch (error) {
      console.error("Failed to add to cart:", error);
      toast.error("Failed to add to cart");
    }
  };

  const handleToggleWishlist = async (product) => {
    if (!user?.id) {
      openModal("Login");
      return; 
    }

    try {
      const productId = product._id || product.id;
      const wasInWishlist = isInWishlist(productId);
      
      await dispatch(toggleWishlistItem({
        userId: user.id,
        productId: productId
      })).unwrap();
      
      toast.success(
        wasInWishlist 
          ? 'Removed from Wishlist' 
          : 'Added to Wishlist'
      );
    } catch (error) {
      toast.error('Failed to update wishlist');
      console.error("Wishlist update error:", error);
    }
  };

  const handleViewDetails = (product) => {
    console.log("View details:", product);
  };

  const handleProductClick = (product) => {
    const slug = product.name
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .trim();
    navigate(`/product/${slug}`, { state: { product } });
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < (pages || 1)) {
      setPage(page + 1);
    }
  };
 
  return (
    <div className="max-w-7xl mx-auto">
      <ExploreOurProductsHeader
        page={page}
        pages={pages || 1}
        onPreviousPage={handlePreviousPage}
        onNextPage={handleNextPage}
      />
      
      <ExploreOurProductList
        products={displayProducts}
        loading={loading}
        error={error}
        itemsPerPage={itemsPerPage}
        page={page}
        pages={pages || 1}
        onAddToCart={handleAddToCart}
        onToggleWishlist={handleToggleWishlist}
        onViewDetails={handleViewDetails}
        onProductClick={handleProductClick}
        isInWishlist={isInWishlist}
      />
    </div>
  );
};

export default ExploreOurProducts;











