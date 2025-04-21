const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
// const auth = require("../middleware/auth")

router.post('/register',  userController.registerUser);
router.post('/login', userController.loginUser);
// router.post('/change-password',userController.changePassword);
router.put('/update-profile', userController.updateProfile);

module.exports = router;