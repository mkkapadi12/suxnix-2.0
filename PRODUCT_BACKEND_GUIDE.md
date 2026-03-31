# Suxnix Product Backend Implementation Guide

## Overview

This document describes the complete Product backend implementation for the Suxnix Health & Wellness Supplements Marketplace. The implementation follows the existing codebase patterns (Model → Controller → Routes) and integrates seamlessly with the admin authentication system.

---

## Files Created

### 1. `server/models/product.model.js` (219 lines)
Comprehensive Mongoose schema for health & wellness supplement products.

**Key Features:**
- Complete product data structure with 30+ fields
- Virtual fields for computed values (`discountPercentage`, `isInStock`)
- Pre-save hooks for slug generation and thumbnail auto-setting
- Database indexes for performance optimization
- Proper enum validation and field constraints

**Core Fields:**
- `name`, `slug`, `description`, `shortDescription`, `sku`
- `category` (enum: protein, vitamins, pre_workout, fat_burner, creatine, amino_acids, weight_gainer, other)
- `price`, `compareAtPrice`, `currency` (INR)
- `stock`, `lowStockThreshold`, `trackInventory`
- `images[]`, `thumbnail`, `weight`, `servingSize`, `servingsPerContainer`, `flavors[]`
- `nutritionFacts[]`, `ingredients`, `allergens[]`, `certifications[]`
- `status` (draft, active, inactive, archived), `isPublished`, `isFeatured`, `isBestseller`
- `metaTitle`, `metaDescription`, `metaKeywords` (SEO)
- `ratings` (average, count), `createdBy`, `updatedBy` (admin tracking)

---

### 2. `server/controllers/product.controller.js` (799 lines)
Complete controller implementation with 17 functions covering all product operations.

#### Public Functions (6)
1. **`getAllProducts`** - List with filtering, search, sorting, pagination
   - Filters: category, brand, isFeatured, isBestseller, price range
   - Search: name, description, tags (regex, case-insensitive)
   - Sort: newest, oldest, price_asc, price_desc, rating, popular
   - Default: only active & published products
   - Query params: `?category=protein&search=whey&sort=price_asc&page=1&limit=12`

2. **`getFeaturedProducts`** - Get featured items with limit
   - Query: `?limit=8`

3. **`getBestsellerProducts`** - Get bestseller items with limit
   - Query: `?limit=8`

4. **`getProductsByCategory`** - Category-specific products with pagination
   - Route: `/category/:category`
   - Query: `?page=1&limit=12`

5. **`getProductBySlug`** - Fetch by URL slug
   - Route: `/:slug`

6. **`getProductById`** - Fetch by MongoDB ID
   - Route: `/id/:id`

7. **`getRelatedProducts`** - Get similar products (same category)
   - Route: `/:id/related`
   - Returns 4 products

#### Admin Functions (11)
All require `adminAuthMiddleware` + `requirePermission('manage_products')`

1. **`adminGetAllProducts`** - Unfiltered list for admin
   - All statuses, published/unpublished visible
   - Same filters + additional `status`, `isPublished` filters
   - Populates admin details (`createdBy`, `updatedBy`)

2. **`createProduct`** - Create new product
   - Validates required: name, description, sku, category, price, stock
   - Auto-generates slug
   - Checks duplicate SKU
   - Sets `createdBy`, `updatedBy` to current admin
   - Returns 201 status

3. **`updateProduct`** - Partial update
   - Regenerates slug if name changes
   - Prevents direct status/publish changes (use dedicated endpoints)

4. **`deleteProduct`** - Hard delete

5. **`updateProductStatus`** - Change status (draft→active→inactive→archived)
   - Validates status value

6. **`togglePublish`** - Publish/unpublish toggle
   - Only allows publishing active products

7. **`toggleFeatured`** - Featured flag toggle

8. **`toggleBestseller`** - Bestseller flag toggle

9. **`updateStock`** - Update inventory
   - Validates stock >= 0
   - Returns low stock warning if stock <= lowStockThreshold

10. **`bulkUpdateStatus`** - Batch status update
    - Body: `{ productIds: [...], status: '...' }`
    - Returns modified count

11. **`getProductStats`** - Dashboard statistics
    - Total products, by status, by category
    - Featured, bestseller, out-of-stock, low-stock counts
    - Returns aggregated data

---

### 3. `server/routes/product.routes.js` (143 lines)

**Route Organization:**
- **Specific routes first** (featured, bestsellers, category, id, related)
- **Dynamic routes last** (slug, general)
- **Admin routes** (all with middleware protection)

**Public Routes (no auth):**
```
GET    /api/products                        → getAllProducts
GET    /api/products/featured               → getFeaturedProducts
GET    /api/products/bestsellers            → getBestsellerProducts
GET    /api/products/category/:category     → getProductsByCategory
GET    /api/products/id/:id                 → getProductById
GET    /api/products/:id/related            → getRelatedProducts
GET    /api/products/:slug                  → getProductBySlug
```

**Admin Routes** (require adminAuthMiddleware + requirePermission('manage_products')):
```
GET    /api/products/admin/all              → adminGetAllProducts
GET    /api/products/admin/stats            → getProductStats
POST   /api/products/admin/create           → createProduct
PUT    /api/products/admin/:id              → updateProduct
DELETE /api/products/admin/:id              → deleteProduct
PATCH  /api/products/admin/:id/status       → updateProductStatus
PATCH  /api/products/admin/:id/publish      → togglePublish
PATCH  /api/products/admin/:id/featured     → toggleFeatured
PATCH  /api/products/admin/:id/bestseller   → toggleBestseller
PATCH  /api/products/admin/:id/stock        → updateStock
PATCH  /api/products/admin/bulk/status      → bulkUpdateStatus
```

**Route Conflict Prevention:**
- `/admin/*` routes registered before `/:id` and `/:slug`
- Specific routes (`/featured`, `/bestsellers`, etc.) before generic `/:slug`
- This prevents Express from matching `/featured` to `/:slug` route

---

### 4. `server/index.js` (Updated)

Added product routes integration:
```javascript
const product_routes = require('./routes/product.routes');
app.use('/api/products', product_routes);
```

---

## Usage Examples

### Public API

#### Get All Products with Filters
```bash
GET /api/products?category=protein&search=whey&sort=price_asc&minPrice=1000&maxPrice=5000&page=1&limit=12
```

Response:
```json
{
  "msg": "Products retrieved successfully!",
  "products": [...],
  "pagination": {
    "total": 45,
    "page": 1,
    "limit": 12,
    "pages": 4
  }
}
```

#### Get Product by Slug
```bash
GET /api/products/suxnix-whey-protein-gold
```

#### Get Featured Products
```bash
GET /api/products/featured?limit=8
```

#### Get Products by Category
```bash
GET /api/products/category/protein?page=1&limit=12
```

#### Get Related Products
```bash
GET /api/products/670abc.../related
```

### Admin API

#### Create Product
```bash
POST /api/products/admin/create
Authorization: Bearer <admin_token>

{
  "name": "Suxnix Whey Protein Gold",
  "description": "Premium whey protein isolate for muscle growth...",
  "shortDescription": "Fast-absorbing whey isolate for serious gains.",
  "sku": "SXN-WP-001",
  "category": "protein",
  "price": 2499,
  "compareAtPrice": 2999,
  "stock": 150,
  "lowStockThreshold": 20,
  "brand": "Suxnix",
  "weight": { "value": 1, "unit": "kg" },
  "servingSize": "1 scoop (30g)",
  "servingsPerContainer": 33,
  "flavors": ["Chocolate", "Vanilla", "Strawberry"],
  "nutritionFacts": [
    { "nutrient": "Protein", "amount": "24g", "dailyValue": "48%" }
  ],
  "ingredients": "Whey Protein Isolate, Cocoa Powder, ...",
  "allergens": ["Milk"],
  "certifications": ["GMP Certified"],
  "tags": ["whey", "protein", "muscle"],
  "images": [
    { "url": "...", "alt": "...", "isPrimary": true }
  ],
  "metaTitle": "Suxnix Whey Protein Gold",
  "metaDescription": "Buy premium whey protein isolate...",
  "status": "active",
  "isPublished": true,
  "isFeatured": true
}
```

#### Update Product
```bash
PUT /api/products/admin/670abc...
Authorization: Bearer <admin_token>

{
  "name": "Updated Name",
  "price": 2399,
  "stock": 200
}
```

#### Update Stock
```bash
PATCH /api/products/admin/670abc.../stock
Authorization: Bearer <admin_token>

{ "stock": 200 }
```

#### Toggle Publish Status
```bash
PATCH /api/products/admin/670abc.../publish
Authorization: Bearer <admin_token>
```

#### Bulk Update Status
```bash
PATCH /api/products/admin/bulk/status
Authorization: Bearer <admin_token>

{
  "productIds": ["670abc...", "670def..."],
  "status": "inactive"
}
```

#### Get Admin Statistics
```bash
GET /api/products/admin/stats
Authorization: Bearer <admin_token>
```

Response:
```json
{
  "msg": "Product statistics retrieved successfully!",
  "stats": {
    "totalProducts": 150,
    "activeProducts": 120,
    "publishedProducts": 100,
    "featuredProducts": 10,
    "bestsellerProducts": 15,
    "outOfStockProducts": 5,
    "lowStockProducts": 8,
    "categoryStats": {
      "protein": 45,
      "vitamins": 30,
      "pre_workout": 25
    },
    "statusStats": {
      "active": 120,
      "draft": 20,
      "inactive": 10,
      "archived": 0
    }
  }
}
```

---

## Database Schema Validation

### Required Fields
- `name` (String, trimmed)
- `description` (String)
- `sku` (String, unique)
- `category` (Enum)
- `price` (Number, min: 0)
- `stock` (Number, min: 0)

### Automatic Features
1. **Slug Generation** - Pre-save hook converts name to URL-friendly slug
   - Example: "Suxnix Whey Protein Gold" → "suxnix-whey-protein-gold"
2. **Thumbnail** - Auto-set from primary image in images array
3. **Virtual Fields** - Computed on demand:
   - `discountPercentage` - Calculated from price and compareAtPrice
   - `isInStock` - Returns `stock > 0`

### Indexes
- `slug` (unique) - Fast slug lookups
- `category` - Filter by category
- `status` - Filter by status
- `isPublished` - Show/hide published products

---

## Error Handling

All errors follow existing pattern:
```javascript
const error = new Error('Error message');
error.statusCode = 400; // or 404, 401, 403, etc.
return next(error);
```

Common errors:
- 400: Missing required fields, duplicate SKU, invalid status
- 404: Product not found
- 401: Unauthorized (missing auth)
- 403: Forbidden (missing permission)

---

## Admin Permissions Required

All admin routes require:
1. `adminAuthMiddleware` - Validates JWT token and sets `req.admin`
2. `requirePermission('manage_products')` - Checks admin has manage_products permission

The admin model defines 6 permissions:
- `manage_users`
- `manage_products` ← Required for product endpoints
- `manage_orders`
- `manage_admins`
- `view_reports`
- `manage_content`

---

## Stock Management

### Low Stock Alert
When updating stock, if new stock ≤ `lowStockThreshold`:
```json
{
  "msg": "Product stock updated successfully!",
  "product": {...},
  "isLowStock": true,
  "warning": "Stock is low (8 units remaining)"
}
```

### Stock Tracking
- Set `trackInventory: true` (default) to enable stock management
- Set to `false` for unlimited items
- Check `isInStock` virtual field (true if stock > 0)

---

## Best Practices

1. **Always validate SKU uniqueness** before product creation
2. **Use specific routes before dynamic routes** to avoid Express route conflicts
3. **Check product status and publish state** for public APIs
4. **Use pagination** for large product lists (default limit: 12)
5. **Set low stock threshold** appropriately (default: 10)
6. **Include images in creation** for better user experience
7. **Use meta fields** for SEO optimization
8. **Track createdBy/updatedBy** for audit trail

---

## Integration with Frontend

Frontend should:
1. Use public routes for product browsing (no auth needed)
2. Use admin routes for product management (admin auth required)
3. Handle pagination for product lists
4. Display discount percentage when compareAtPrice exists
5. Show low stock warnings when appropriate
6. Implement search and filter UI
7. Use slug for product URLs (SEO-friendly)

---

## Testing Checklist

- [ ] Create product with all required fields
- [ ] Verify slug auto-generation
- [ ] Test duplicate SKU prevention
- [ ] Verify thumbnail auto-set from primary image
- [ ] Test filtering by category, status, featured
- [ ] Test search across name, description, tags
- [ ] Test pagination with various limits
- [ ] Test sorting (price, date, rating, popularity)
- [ ] Test stock update and low stock warning
- [ ] Test bulk status update
- [ ] Verify admin permissions enforcement
- [ ] Test public routes (no auth needed)
- [ ] Test product statistics calculation
- [ ] Verify createdBy/updatedBy tracking
- [ ] Test related products (same category)

---

## Future Enhancements

Potential additions:
- Review and rating system (detailed)
- Inventory history and tracking
- Product variants/options
- Discount codes and promotion integration
- Product recommendations algorithm
- Analytics and sales tracking
- Product import/export (CSV)
- Image optimization and CDN integration
