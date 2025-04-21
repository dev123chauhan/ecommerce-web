const router = require('express').Router();
const cartController = require('../controllers/cartController');

router.get('/cart/:userId', cartController.getCart);
router.post('/cart/:userId/add', cartController.addToCart);
router.delete('/cart/:userId/remove/:productId', cartController.removeFromCart);
// router.put('/cart/:userId/quantity', cartController.updateQuantity);
router.put('/cart/:userId/quantity/:productId', cartController.updateQuantity);
module.exports = router;    