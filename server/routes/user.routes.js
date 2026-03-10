const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/user.middleware');

//register route
router.post('/register', userController.registerUser);
//login route
router.post('/login', userController.loginUser);
//profile route
router.get('/profile', authMiddleware, userController.profile);

module.exports = router;
