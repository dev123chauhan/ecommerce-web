import { Sidebar } from 'primereact/sidebar';
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react"; 
import cartGif from "../../../public/assets/emptycart.gif";
import { Skeleton } from "antd"; 
import Button from '../Button/Button';
import PropTypes from "prop-types";
import { fetchCart, removeFromCart } from '../../redux/slice/cartSlice';
const Cart = ({ visible, onHide }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    items,
    totalAmount,
    loading: apiLoading,
  } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const currency = items.length > 0 ? items[0].currency : "";
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.id && visible) {
      dispatch(fetchCart(user.id));
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    } else if (visible) {
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    }
  }, [dispatch, user, visible]);

  const isLoading = loading || apiLoading;

  const handleRemoveItem = async (productId) => {
    try {
      if (!user?.id) {
        alert("Please log in to remove items");
        return;
      }

      setLoading(true); 

      await dispatch(
        removeFromCart({
          userId: user.id,
          productId,
        })
      ).unwrap();

      dispatch(fetchCart(user.id));

      setTimeout(() => {
        setLoading(false);
        toast.success("Item Removed from Cart");
      }, 800);
    } catch (error) {
      console.error("Failed to remove item:", error);
      setLoading(false);
      alert(error.message || "An error occurred while removing the item.");
    }
  };

  const handleCheckout = () => {
    onHide();
    navigate("/billing");
  };

  return (
    <Sidebar 
      visible={visible} 
      position="right" 
      onHide={onHide}
      className="w-full md:w-[28rem] dark:bg-gray-900 dark:text-white"
      // style={{ width: '100%', maxWidth: '28rem' }}
    >
      <div className="h-full flex flex-col ">
        <h2 className="text-2xl font-bold mb-4 pb-4 text-black">
          Shopping Cart
        </h2>

        {isLoading ? (
          <div className="flex-1 space-y-4 overflow-y-auto">
            {[1, 2, 3].map((item) => (
              <div key={item} className="border dark:border-gray-700 rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Skeleton.Image active style={{ width: 64, height: 64 }} />
                    <div>
                      <Skeleton active paragraph={{ rows: 1 }} />
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <Skeleton.Button active style={{ width: 80 }} />
                  <Skeleton.Button active style={{ width: 50 }} />
                </div>
              </div>
            ))}
          </div>
        ) : items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center">
            <img src={cartGif} className="w-full max-w-xs mx-auto" alt="Empty cart" />
            <h3 className="text-center font-bold text-xl mt-4">
              No Product in Cart
            </h3>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto space-y-3 mb-4">
              {items.map((item, index) => (
                <div key={index} className="border dark:border-gray-700 rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-contain rounded"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium text-sm">{item.name}</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          {item.currency}{item.price}
                        </p>
                      </div>
                    </div>
                    <button
                      className="text-red-500 hover:text-red-600"
                      onClick={() => handleRemoveItem(item.productId)}
                    >
                      <Trash className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="border rounded-md inline-flex dark:border-gray-700">
                      <button className="px-3 py-1 hover:bg-gray-100 dark:hover:bg-gray-800">
                        -
                      </button>
                      <input
                        type="text"
                        value={item.quantity}
                        className="w-10 text-center dark:bg-gray-900 dark:border-gray-700 border-x"
                        readOnly
                      />
                      <button className="px-3 py-1 hover:bg-gray-100 dark:hover:bg-gray-800">
                        +
                      </button>
                    </div>
                    <p className="font-medium">{item.currency}{item.totalPrice}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t dark:border-gray-700 pt-4 space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Subtotal:</span>
                  <span>{currency}{totalAmount}</span>
                </div>
                <div className="flex justify-between text-sm pb-3 border-b dark:border-gray-700">
                  <span>Shipping:</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between font-bold text-lg">
                  <span>Total:</span>
                  <span>{currency}{totalAmount}</span>
                </div>
              </div>
              <Button 
                text="Proceed to checkout" 
                className="w-full py-3 primaryColor text-white" 
                onClick={handleCheckout}
              />
            </div>
          </>
        )}
      </div>
    </Sidebar>
  );
};
Cart.propTypes = {
  visible: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
};
export default Cart;