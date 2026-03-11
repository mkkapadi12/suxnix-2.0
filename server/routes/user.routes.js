const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const addressController = require('../controllers/address.controller');
const authMiddleware = require('../middlewares/user.middleware');

//register route
router.post('/register', userController.registerUser);
//login route
router.post('/login', userController.loginUser);
//profile route
router.get('/profile', authMiddleware, userController.profile);
//update profile route
router.put('/profile', authMiddleware, userController.updateProfile);

// Address routes
router.get('/addresses', authMiddleware, addressController.getAllAddresses);
router.post('/addresses', authMiddleware, addressController.createAddress);
router.put('/addresses/:id', authMiddleware, addressController.updateAddress);
router.delete('/addresses/:id', authMiddleware, addressController.deleteAddress);
router.patch('/addresses/:id/set-default', authMiddleware, addressController.setDefaultAddress);

module.exports = router;
