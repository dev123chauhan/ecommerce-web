const Wishlist = require('../models/Wishlist');
const Product = require('../models/Product'); // Import your existing Product model

exports.toggleWishlistItem = async (req, res) => {
  try {
    const { userId, productId } = req.body;
    
    // Check if item exists in wishlist
    const existingItem = await Wishlist.findOne({ 
      userId, 
      productId 
    });

    if (existingItem) {
      // Remove item if it exists
      await Wishlist.findOneAndDelete({ 
        userId, 
        productId 
      });
    } else {
      // Add item if it doesn't exist
      await Wishlist.create({ userId, productId });
    }

    // Return updated wishlist with populated product details
    const updatedWishlist = await Wishlist.find({ userId })
      .populate('productId')
      .exec();

    res.json(updatedWishlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getWishlist = async (req, res) => {
  try {
    const { userId } = req.params;
    const wishlist = await Wishlist.find({ userId })
      .populate('productId')
      .exec();
    res.json(wishlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.removeItem = async (req, res) => {
  try {
    const { userId, productId } = req.params;
    await Wishlist.findOneAndDelete({ 
      userId, 
      productId 
    });
    res.json({ message: 'Item removed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};