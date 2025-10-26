export const safeToFixed = (value, decimals = 2) => {
  const num = parseFloat(value);
  return isNaN(num) ? "0.00" : num.toFixed(decimals);
};

export const calculateOrderTotal = (items, shipping = 0) => {
  if (!items || !Array.isArray(items)) return 0;
  
  const subtotal = items.reduce(
    (sum, item) => sum + (parseFloat(item.price) || 0) * (parseInt(item.quantity) || 1),
    0
  );
  const tax = subtotal * 0.08;
  return subtotal + (parseFloat(shipping) || 0) + tax;
};