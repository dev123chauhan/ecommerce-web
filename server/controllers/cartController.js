// const Cart = require('../models/Cart');
const Cart = require("../models/Cart");
const cartController = {
  // Get cart items
  getCart: async (req, res) => {
    try {
      const cart = await Cart.findOne({ userId: req.params.userId });
      if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
      }
      res.json(cart);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Add item to cart
  addToCart: async (req, res) => {
    try {
      let cart = await Cart.findOne({ userId: req.params.userId });
      
      if (!cart) {
        cart = new Cart({
          userId: req.params.userId,
          items: [],
          totalAmount: 0
        });
      }
      const { id, name, price, image } = req.body;
      const existingItem = cart.items.find(item => item.productId && item.productId.toString() === id);

      if (existingItem) {
        existingItem.quantity += 1;
        existingItem.totalPrice = existingItem.quantity * existingItem.price;
      } else {
        cart.items.push({
          productId: id,
          name,
          price,
          image,
          quantity: 1,
          totalPrice: price
        });
      }

      cart.totalAmount = cart.items.reduce((total, item) => total + item.totalPrice, 0);
      await cart.save();
      res.json(cart);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Remove item from cart

  removeFromCart: async (req, res) => {
    try {
      const cart = await Cart.findOne({ userId: req.params.userId });
      if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
      }

      // Find the index of the item to remove
      const itemIndex = cart.items.findIndex(item => 
        item.productId && item.productId.toString() === req.params.productId
      );

      // if (itemIndex === -1) {
      //   return res.status(404).json({ message: 'Item not found in cart' });
      // }

      // Remove only the specific item using splice
      cart.items.splice(itemIndex, 1);
      
      // Recalculate total amount
      cart.totalAmount = cart.items.reduce((total, item) => total + item.totalPrice, 0);
      
      await cart.save();
      res.json(cart);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  updateQuantity: async (req, res) => {
    try {
      const cart = await Cart.findOne({ userId: req.params.userId });
      if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
      }
  
      const { productId } = req.params;
      const { type } = req.body;
      
      const item = cart.items.find(item => 
        item.productId && item.productId.toString() === productId
      );
  
    

      if (item && type === 'increase') {
        item.quantity = (item.quantity ?? 0) + 1; // Ensure quantity is not undefined or null
    } else if (item && type === 'decrease') {
        if ((item.quantity ?? 0) > 1) {
            item.quantity -= 1;
        } else {
            cart.items = cart.items.filter(item =>
                item.productId && item.productId.toString() !== productId
            );
        }
    }
    
    if (item && (item.quantity ?? 0) > 0) {
        item.totalPrice = (item.quantity ?? 0) * item.price;
    }
    
  
      cart.totalAmount = cart.items.reduce((total, item) => total + item.totalPrice, 0);
      await cart.save();
      res.json(cart);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = cartController;