const express = require('express');
const {
  // Public routes
  getAllProducts,
  getFeaturedProducts,
  getBestsellerProducts,
  getProductsByCategory,
  getProductBySlug,
  getProductById,
  getRelatedProducts,
  // Admin routes
  adminGetAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  updateProductStatus,
  togglePublish,
  toggleFeatured,
  toggleBestseller,
  updateStock,
  bulkUpdateStatus,
  getProductStats,
} = require('../controllers/product.controller');

const {
  requirePermission,
  adminAuthMiddleware,
} = require('../middlewares/admin.middleware');

const router = express.Router();

// ============================================
// PUBLIC ROUTES (no auth required)
// ============================================

// Specific routes first (to avoid conflicts with dynamic routes)
router.get('/featured', getFeaturedProducts);
router.get('/bestsellers', getBestsellerProducts);

// Category route
router.get('/category/:category', getProductsByCategory);

// Product by ID routes
router.get('/id/:id', getProductById);
router.get('/:id/related', getRelatedProducts);

// Product by slug (must be last to avoid conflict with other params)
router.get('/:slug', getProductBySlug);

// General products (with filters/search/pagination)
router.get('/', getAllProducts);

// ============================================
// ADMIN ROUTES (require adminAuthMiddleware + manage_products permission)
// ============================================

// Admin stats - specific before dynamic
router.get(
  '/admin/stats',
  adminAuthMiddleware,
  requirePermission('manage_products'),
  getProductStats,
);

// Admin get all products
router.get(
  '/admin/all',
  adminAuthMiddleware,
  requirePermission('manage_products'),
  adminGetAllProducts,
);

console.log(typeof adminAuthMiddleware);

// Create product
router.post(
  '/admin/create',
  adminAuthMiddleware,
  requirePermission('manage_products'),
  createProduct,
);

// Update product
router.put(
  '/admin/:id',
  adminAuthMiddleware,
  requirePermission('manage_products'),
  updateProduct,
);

// Delete product
router.delete(
  '/admin/:id',
  adminAuthMiddleware,
  requirePermission('manage_products'),
  deleteProduct,
);

// Update product status
router.patch(
  '/admin/:id/status',
  adminAuthMiddleware,
  requirePermission('manage_products'),
  updateProductStatus,
);

// Toggle publish
router.patch(
  '/admin/:id/publish',
  adminAuthMiddleware,
  requirePermission('manage_products'),
  togglePublish,
);

// Toggle featured
router.patch(
  '/admin/:id/featured',
  adminAuthMiddleware,
  requirePermission('manage_products'),
  toggleFeatured,
);

// Toggle bestseller
router.patch(
  '/admin/:id/bestseller',
  adminAuthMiddleware,
  requirePermission('manage_products'),
  toggleBestseller,
);

// Update stock
router.patch(
  '/admin/:id/stock',
  adminAuthMiddleware,
  requirePermission('manage_products'),
  updateStock,
);

// Bulk update status
router.patch(
  '/admin/bulk/status',
  adminAuthMiddleware,
  requirePermission('manage_products'),
  bulkUpdateStatus,
);

module.exports = router;
