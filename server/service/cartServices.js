const Cart = require("../models/Cart");

class CartService {
  static async getCart(userId) {
    const cart = await Cart.findOne({ userId });
    return cart?.items || [];
  }

  static async addToCart(userId, productData) {
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const existingItem = cart.items.find(item => 
      item.productId.toString() === productData.id
    );

    if (existingItem) {
      existingItem.quantity++;
      existingItem.totalPrice = existingItem.price * existingItem.quantity;
    } else {
      cart.items.push({
        productId: productData.id,
        name: productData.name,
        price: productData.price,
        image: productData.image,
        quantity: 1,
        totalPrice: productData.price
      });
    }

    cart.calculateTotalAmount();
    await cart.save();
    return cart.items;
  }

  static async updateQuantity(userId, productId, type) {
    const cart = await Cart.findOne({ userId });
    if (!cart) return null;

    const item = cart.items.find(item => 
      item.productId.toString() === productId
    );

    if (item) {
      if (type === 'increase') {
        item.quantity++;
      } else if (type === 'decrease' && item.quantity > 1) {
        item.quantity--;
      }
      item.totalPrice = item.price * item.quantity;
      cart.calculateTotalAmount();
      await cart.save();
    }
    return cart.items;
  }

  static async removeFromCart(userId, productId) {
    const cart = await Cart.findOne({ userId });
    if (!cart) return null;

    cart.items = cart.items.filter(item => 
      item.productId.toString() !== productId
    );
    cart.calculateTotalAmount();
    await cart.save();
    return cart.items;
  }
}

module.exports = CartService;