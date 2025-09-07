import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart, removeFromCart } from "../../slice/CartSlice";
import { Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react"; 
import cartGif from "../../assets/emptycart.gif";
import { Skeleton } from "antd"; 

const Cart = () => {
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
    if (user?.id) {
      dispatch(fetchCart(user.id));
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    } else {
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    }
  }, [dispatch, user]);


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
    navigate("/billing");
  };


  if (isLoading) {
    return (
      <div className="dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-400">
        <div className="min-h-screen container mx-auto px-4 py-8 mt-10 max-w-7xl">
          <div className="sm:hidden space-y-4">
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


          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full mb-8">
              <thead>
                <tr className="border-b dark:border-gray-700">
                  <th className="text-left py-2">Product</th>
                  <th className="text-left py-2">Price</th>
                  <th className="text-left py-2">Quantity</th>
                  <th className="text-right py-2">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3].map((item) => (
                  <tr key={item} className="border-b dark:border-gray-700">
                    <td className="py-4">
                      <div className="flex items-center">
                        <Skeleton.Button
                          active
                          style={{ width: 20, marginRight: 8 }}
                        />
                        <Skeleton.Image
                          active
                          style={{ width: 48, height: 48, marginRight: 8 }}
                        />
                        <Skeleton
                          active
                          paragraph={{ rows: 1 }}
                          style={{ width: 150 }}
                        />
                      </div>
                    </td>
                    <td className="py-4">
                      <Skeleton
                        active
                        paragraph={{ rows: 1 }}
                        style={{ width: 60 }}
                      />
                    </td>
                    <td className="py-4">
                      <Skeleton.Button active style={{ width: 100 }} />
                    </td>
                    <td className="py-4 text-right">
                      <Skeleton
                        active
                        paragraph={{ rows: 1 }}
                        style={{ width: 60 }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            <div className="w-full lg:w-1/2">
              <Skeleton.Input active style={{ width: "100%", height: 40 }} />
            </div>
            <div className="w-full lg:w-1/2">
              <div className="border border-gray-300 dark:border-gray-700 rounded-lg p-6">
                <Skeleton
                  active
                  title={{ width: 100 }}
                  paragraph={{ rows: 4 }}
                />
                <Skeleton.Button
                  active
                  block
                  style={{ height: 40, marginTop: 24 }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dark:bg-gray-900 dark:text-white transition-colors duration-300">
      <div className="container mx-auto px-4 py-8 mt-10 max-w-7xl sm:px-6 lg:px-8 xl:px-0">
        <div className="sm:hidden">
          {items.length > 0 ? (
            <div className="space-y-4">
              {items.map((item, index) => (
                <div key={index} className="border dark:border-gray-700 mb-3 rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-contain"
                      />
                      <div>
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          {item.price}
                        </p>
                      </div>
                    </div>
                    <button
                      className="text-red-500"
                      onClick={() => handleRemoveItem(item.productId)}
                    >
                      <Trash className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="border  rounded-md inline-flex">
                      <button
                        className="px-3 py-1"
                      >
                        -
                      </button>
                      <input
                        type="text"
                        value={item.quantity}
                        className="w-7 text-center dark:bg-gray-800 dark:border-gray-700"
                        readOnly
                      />
                      <button
                        className="px-3 py-1"
                      >
                        +
                      </button>
                    </div>
                    <p className="font-medium">{item.currency}{item.totalPrice}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="">
              <img src={cartGif} className="w-full max-w-md mx-auto" />
              <h1 className="text-center font-bold text-xl">
                No Product in Cart
              </h1>
            </div>
          )}
        </div>

        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full mb-8">
            <thead>
              <tr className="border-b dark:border-gray-700">
                <th className="text-left py-2">Product</th>
                <th className="text-left py-2">Price</th>
                <th className="text-left py-2">Quantity</th>
                <th className="text-right py-2">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {items.length > 0 ? (
                items.map((item, index) => (
                  <tr key={index} className="border-b dark:border-gray-700">
                    <td className="py-4">
                      <div className="flex items-center">
                        <button
                          className="text-red-500 mr-2"
                          onClick={() => handleRemoveItem(item.productId)}
                        >
                          <Trash className="w-5 h-5" />
                        </button>
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 object-contain mr-2"
                        />
                        <span className="text-sm sm:text-base">
                          {item.name}
                        </span>
                      </div>
                    </td>
                    <td className="py-4">
                      {item.currency}
                      {item.price}
                    </td>
                    <td className="py-4">
                      <div className="border dark:border-gray-700 rounded-md inline-flex">
                        <button
                          className="px-3 py-1"
                        >
                          -
                        </button>
                        <input
                          type="text"
                          value={item.quantity}
                          className="w-8 text-center dark:bg-gray-800 dark:border-gray-700"
                          readOnly
                        />
                        <button
                          className="px-3 py-1"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="py-4 text-right">
                      {item.currency}
                      {item.totalPrice}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="">
                    <img src={cartGif} className="w-full max-w-md mx-auto" />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {items.length > 0 && (
          <>

            <div className="flex flex-col lg:flex-row gap-6">
              <div className="w-full lg:w-1/2">
                <div className="border border-gray-300 dark:border-gray-700 rounded-lg p-6">
                  <h2 className="text-xl font-bold mb-4">Cart Total</h2>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span>
                        {currency}
                        {totalAmount}
                      </span>
                    </div>
                    <div className="flex justify-between pb-3 border-b dark:border-gray-700">
                      <span>Shipping:</span>
                      <span>Free</span>
                    </div>
                    <div className="flex justify-between pt-1">
                      <span className="font-bold">Total:</span>
                      <span className="font-bold">
                        {currency}
                        {totalAmount}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={handleCheckout}
                    className="w-full mt-6 px-6 py-2.5 primaryColor text-white rounded-lg  focus:outline-none focus:ring-2 focus:ring-red-500 text-base font-medium"
                  >
                    Proceed to checkout
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;

