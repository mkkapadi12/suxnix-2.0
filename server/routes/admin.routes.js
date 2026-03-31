const express = require('express');
const {
  registerAdmin,
  loginAdmin,
  getAdminProfile,
  updateAdminProfile,
  changePassword,
  deactivateAdmin,
  getAllAdmins,
  updateAdminRoleAndPermissions,
  deactivateAdminAccount,
} = require('../controllers/admin.controller');
const {
  adminAuthMiddleware,
  requirePermission,
  requireRole,
} = require('../middlewares/admin.middleware');

const router = express.Router();

// Public routes
router.post('/register', registerAdmin);
router.post('/login', loginAdmin);

// Protected routes (requires admin authentication)
router.get('/profile', adminAuthMiddleware, getAdminProfile);
router.put('/profile', adminAuthMiddleware, updateAdminProfile);
router.post('/change-password', adminAuthMiddleware, changePassword);
router.post('/deactivate', adminAuthMiddleware, deactivateAdmin);

// Super admin only routes
router.get('/all', adminAuthMiddleware, requireRole('admin'), getAllAdmins);
router.put(
  '/update-role/:adminId',
  adminAuthMiddleware,
  requireRole('admin'),
  updateAdminRoleAndPermissions,
);
router.post(
  '/deactivate/:adminId',
  adminAuthMiddleware,
  requireRole('admin'),
  deactivateAdminAccount,
);

module.exports = router;
