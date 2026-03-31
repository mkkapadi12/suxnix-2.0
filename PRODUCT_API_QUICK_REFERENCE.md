# Product API - Quick Reference Guide

Base URL: `http://localhost:3000/api/products`

---

## Public Endpoints (No Authentication)

### Get All Products
```bash
curl "http://localhost:3000/api/products"
```

**Query Parameters:**
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 12)
- `category` - Filter by category (protein, vitamins, pre_workout, fat_burner, creatine, amino_acids, weight_gainer, other)
- `brand` - Filter by brand (default: Suxnix)
- `search` - Search in name, description, tags
- `sort` - Sort by: newest (default), oldest, price_asc, price_desc, rating, popular
- `minPrice` - Minimum price
- `maxPrice` - Maximum price
- `isFeatured` - true for featured only
- `isBestseller` - true for bestsellers only

**Example:**
```bash
curl "http://localhost:3000/api/products?category=protein&search=whey&sort=price_asc&minPrice=1000&maxPrice=5000&page=1&limit=12"
```

---

### Get Featured Products
```bash
curl "http://localhost:3000/api/products/featured?limit=8"
```

---

### Get Bestseller Products
```bash
curl "http://localhost:3000/api/products/bestsellers?limit=8"
```

---

### Get Products by Category
```bash
curl "http://localhost:3000/api/products/category/protein?page=1&limit=12"
```

**Categories:** protein, vitamins, pre_workout, fat_burner, creatine, amino_acids, weight_gainer, other

---

### Get Product by Slug
```bash
curl "http://localhost:3000/api/products/suxnix-whey-protein-gold"
```

---

### Get Product by ID
```bash
curl "http://localhost:3000/api/products/id/670abc123def456789012345"
```

---

### Get Related Products
```bash
curl "http://localhost:3000/api/products/670abc123def456789012345/related"
```

---

## Admin Endpoints (Require Authentication)

All admin endpoints require:
- `Authorization: Bearer <admin_jwt_token>` header
- Admin must have `manage_products` permission

---

### Get All Products (Admin View)
```bash
curl -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  "http://localhost:3000/api/products/admin/all?page=1&limit=20"
```

**Query Parameters:**
- `page` - Page number
- `limit` - Items per page
- `category` - Filter by category
- `status` - Filter by status (draft, active, inactive, archived)
- `isPublished` - true or false
- `search` - Search by name, sku, description
- `sort` - Sort by: newest (default), oldest, price_asc, price_desc

---

### Get Product Statistics
```bash
curl -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  "http://localhost:3000/api/products/admin/stats"
```

**Response includes:**
- Total products, active, published, featured, bestseller
- Out of stock, low stock counts
- Count by category and status

---

### Create Product
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Suxnix Whey Protein Gold",
    "description": "Premium whey protein isolate for muscle growth and recovery",
    "shortDescription": "Fast-absorbing whey isolate",
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
    "ingredients": "Whey Protein Isolate, Cocoa Powder...",
    "allergens": ["Milk"],
    "certifications": ["GMP Certified"],
    "tags": ["whey", "protein", "muscle"],
    "images": [
      { "url": "https://example.com/image.jpg", "alt": "Product", "isPrimary": true }
    ],
    "metaTitle": "Suxnix Whey Protein Gold",
    "metaDescription": "Buy premium whey protein...",
    "status": "active",
    "isPublished": true,
    "isFeatured": true
  }' \
  "http://localhost:3000/api/products/admin/create"
```

**Required fields:**
- name, description, sku, category, price, stock

---

### Update Product
```bash
curl -X PUT \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Product Name",
    "price": 2399,
    "stock": 200,
    "description": "Updated description..."
  }' \
  "http://localhost:3000/api/products/admin/670abc123def456789012345"
```

**Note:** Cannot directly update status or isPublished via this endpoint. Use dedicated endpoints instead.

---

### Delete Product
```bash
curl -X DELETE \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  "http://localhost:3000/api/products/admin/670abc123def456789012345"
```

---

### Update Product Status
```bash
curl -X PATCH \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{ "status": "active" }' \
  "http://localhost:3000/api/products/admin/670abc123def456789012345/status"
```

**Valid statuses:** draft, active, inactive, archived

---

### Toggle Publish Status
```bash
curl -X PATCH \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  "http://localhost:3000/api/products/admin/670abc123def456789012345/publish"
```

**Note:** Product must be status "active" to publish

---

### Toggle Featured
```bash
curl -X PATCH \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  "http://localhost:3000/api/products/admin/670abc123def456789012345/featured"
```

---

### Toggle Bestseller
```bash
curl -X PATCH \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  "http://localhost:3000/api/products/admin/670abc123def456789012345/bestseller"
```

---

### Update Stock
```bash
curl -X PATCH \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{ "stock": 200 }' \
  "http://localhost:3000/api/products/admin/670abc123def456789012345/stock"
```

**Note:** Returns low stock warning if stock ≤ lowStockThreshold

---

### Bulk Update Status
```bash
curl -X PATCH \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "productIds": [
      "670abc123def456789012345",
      "670def456ghi789012345678"
    ],
    "status": "inactive"
  }' \
  "http://localhost:3000/api/products/admin/bulk/status"
```

---

## Response Format

### Success Response (200 OK)
```json
{
  "msg": "Products retrieved successfully!",
  "products": [...],
  "pagination": {
    "total": 100,
    "page": 1,
    "limit": 12,
    "pages": 9
  }
}
```

### Create Response (201 Created)
```json
{
  "msg": "Product created successfully!",
  "product": {
    "_id": "670abc123def456789012345",
    "name": "Suxnix Whey Protein Gold",
    "slug": "suxnix-whey-protein-gold",
    "price": 2499,
    "discountPercentage": 17,
    "isInStock": true,
    ...
  }
}
```

### Error Response (400/404/401/403)
```json
{
  "msg": "Error message here",
  "statusCode": 400
}
```

---

## Category Values

```
protein
vitamins
pre_workout
fat_burner
creatine
amino_acids
weight_gainer
other
```

---

## Sorting Options

- `newest` - Created date descending (default)
- `oldest` - Created date ascending
- `price_asc` - Price ascending
- `price_desc` - Price descending
- `rating` - Average rating descending
- `popular` - Popularity/rating count descending

---

## Status Values

- `draft` - Not ready, hidden from public
- `active` - Ready for publication
- `inactive` - Disabled
- `archived` - Archived for historical records

---

## Common Errors

| Error | Status | Solution |
|-------|--------|----------|
| Missing required fields | 400 | Include name, description, sku, category, price, stock |
| SKU already exists | 400 | Use unique SKU |
| Product not found | 404 | Check product ID/slug |
| Product must be active to publish | 400 | Set status to "active" first |
| Unauthorized | 401 | Include valid Authorization header |
| Permission denied | 403 | Admin must have manage_products permission |

---

## Virtual Fields (Automatically Calculated)

These fields appear in responses but aren't stored in database:

```json
{
  "discountPercentage": 17,  // (compareAtPrice - price) / compareAtPrice * 100
  "isInStock": true          // stock > 0
}
```

---

## Tips

1. **Use pagination** for large lists (add `?page=2&limit=20`)
2. **Search is case-insensitive** regex across name, description, tags
3. **Slug is auto-generated** from name - don't set manually
4. **Thumbnail auto-set** from primary image - don't set manually
5. **Use category parameter** to filter products
6. **Check `isPublished` and `status`** before showing products publicly
7. **Low stock warnings** appear when stock ≤ lowStockThreshold
8. **Slug contains only lowercase, hyphens, no special chars**

---

## Testing Tips

1. **Admin Token** - Get from `/api/auth/admin/login` with admin credentials
2. **Test public routes first** (no auth needed)
3. **Check pagination** with different `page` and `limit` values
4. **Verify slug generation** after creating product with spaces/special chars
5. **Test low stock alerts** by setting stock <= lowStockThreshold
6. **Verify permissions** by testing without admin token (should fail)
7. **Check product stats** for accurate counts
8. **Test bulk operations** with multiple product IDs
