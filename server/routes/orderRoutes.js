const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
// const authMiddleware = require('../middleware/auth');

router.post('/',  orderController.createOrder);
router.get('/:id',  orderController.getOrderById);
router.get('/user/:userId',  orderController.getUserOrders);

module.exports = router;