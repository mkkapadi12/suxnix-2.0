const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const addressController = require('../controllers/address.controller');
const orderController = require('../controllers/order.controller');
const wishlistController = require('../controllers/wishlist.controller');
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
router.delete(
  '/addresses/:id',
  authMiddleware,
  addressController.deleteAddress,
);
router.patch(
  '/addresses/:id/set-default',
  authMiddleware,
  addressController.setDefaultAddress,
);

// Order routes
router.get('/orders', authMiddleware, orderController.getAllOrders);
router.get('/orders/:orderId', authMiddleware, orderController.getOrderById);
router.post('/orders', authMiddleware, orderController.createOrder);
router.put(
  '/orders/:orderId',
  authMiddleware,
  orderController.updateOrderStatus,
);
router.patch(
  '/orders/:orderId/cancel',
  authMiddleware,
  orderController.cancelOrder,
);

// Wishlist routes
router.get('/wishlist', authMiddleware, wishlistController.getWishlist);
router.post('/wishlist', authMiddleware, wishlistController.addToWishlist);
router.delete(
  '/wishlist/:productId',
  authMiddleware,
  wishlistController.removeFromWishlist,
);
router.delete('/wishlist', authMiddleware, wishlistController.clearWishlist);
router.get(
  '/wishlist/check/:productId',
  authMiddleware,
  wishlistController.isInWishlist,
);

module.exports = router;
