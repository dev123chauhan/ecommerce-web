const express = require('express');
const router = express.Router();
const wishlistController = require('../controllers/wishlistController');  // Correct path for controller

// Route to toggle (add/remove) wishlist items
router.post('/wishlist/toggle', wishlistController.toggleWishlistItem);

// Route to get the wishlist for a specific user
router.get('/wishlist/:userId', wishlistController.getWishlist);

// Route to remove an item from the wishlist by userId and productId
router.delete('/wishlist/:userId/:productId', wishlistController.removeItem);

module.exports = router;
