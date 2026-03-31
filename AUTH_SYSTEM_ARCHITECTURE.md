# Authentication System Architecture

## System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────┐
│                          CLIENT LAYER (Frontend)                        │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ┌──────────────────┐        ┌──────────────────┐                     │
│  │  Admin Login UI  │        │   User Login UI  │                     │
│  └────────┬─────────┘        └────────┬─────────┘                     │
│           │                           │                               │
│           └───────────────┬───────────┘                               │
│                           │                                           │
│         ┌─────────────────▼─────────────────┐                         │
│         │   Authentication Service Layer    │                         │
│         │  (adminAuthService / userAuth...)  │                        │
│         └────────────────┬──────────────────┘                         │
│                          │                                            │
│              ┌───────────┴────────────┐                               │
│              │ Store Token in Storage │                               │
│              │ (localStorage/session) │                               │
│              └───────────────────────┘                                │
│                                                                       │
└──────────────────────────────┬──────────────────────────────────────────┘
                               │
                    ┌──────────▼──────────┐
                    │  HTTP Request with  │
                    │   Bearer Token      │
                    └──────────┬──────────┘
                               │
┌──────────────────────────────▼──────────────────────────────────────────┐
│                         SERVER LAYER (Express)                          │
├──────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  ┌───────────────────────────────────────────────────────────────┐      │
│  │                    Express Routes                             │      │
│  │  ┌─────────────────────────────────────────────────────────┐ │      │
│  │  │ POST   /api/auth/admin/register     (Public)          │ │      │
│  │  │ POST   /api/auth/admin/login        (Public)          │ │      │
│  │  │ GET    /api/auth/admin/profile      (Protected)       │ │      │
│  │  │ PUT    /api/auth/admin/profile      (Protected)       │ │      │
│  │  │ POST   /api/auth/admin/change-password (Protected)    │ │      │
│  │  │ POST   /api/auth/admin/deactivate   (Protected)       │ │      │
│  │  │ GET    /api/auth/admin/all          (Admin Only)      │ │      │
│  │  │ PUT    /api/auth/admin/update-role/:id (Admin Only)   │ │      │
│  │  │ POST   /api/auth/admin/deactivate/:id (Admin Only)    │ │      │
│  │  └─────────────────────────────────────────────────────────┘ │      │
│  └────────┬─────────────────────────────────────────────────────┘      │
│           │                                                            │
│  ┌────────▼─────────────────────────────────────────────────────┐      │
│  │           MIDDLEWARE LAYER                                   │      │
│  │  ┌──────────────────────────────────────────────────────────┐│      │
│  │  │ ┌──────────────────────────────────────────────────────┐││      │
│  │  │ │ adminAuthMiddleware                                 │││      │
│  │  │ │ • Extract token from Authorization header          │││      │
│  │  │ │ • Verify JWT signature                             │││      │
│  │  │ │ • Check token expiry                               │││      │
│  │  │ │ • Fetch admin from DB                              │││      │
│  │  │ │ • Verify account is active                         │││      │
│  │  │ │ • Attach admin to req.admin                        │││      │
│  │  │ └──────────────────────────────────────────────────────┘││      │
│  │  │                                                          ││      │
│  │  │ ┌──────────────────────────────────────────────────────┐││      │
│  │  │ │ requirePermission(permission)                       │││      │
│  │  │ │ • Check if admin has specific permission           │││      │
│  │  │ │ • Return 403 if denied                             │││      │
│  │  │ └──────────────────────────────────────────────────────┘││      │
│  │  │                                                          ││      │
│  │  │ ┌──────────────────────────────────────────────────────┐││      │
│  │  │ │ requireRole(role)                                    │││      │
│  │  │ │ • Check if admin has minimum role                  │││      │
│  │  │ │ • Super admin bypasses all checks                  │││      │
│  │  │ │ • Return 403 if insufficient                       │││      │
│  │  │ └──────────────────────────────────────────────────────┘││      │
│  │  └──────────────────────────────────────────────────────────┘│      │
│  └────────┬─────────────────────────────────────────────────────┘      │
│           │                                                            │
│  ┌────────▼─────────────────────────────────────────────────────┐      │
│  │         CONTROLLER LAYER (Business Logic)                    │      │
│  │  ┌──────────────────────────────────────────────────────────┐│      │
│  │  │ • registerAdmin()                                       ││      │
│  │  │ • loginAdmin()                                          ││      │
│  │  │ • getAdminProfile()                                     ││      │
│  │  │ • updateAdminProfile()                                  ││      │
│  │  │ • changePassword()                                      ││      │
│  │  │ • deactivateAdmin()                                     ││      │
│  │  │ • getAllAdmins() [Super Admin]                          ││      │
│  │  │ • updateAdminRoleAndPermissions() [Super Admin]         ││      │
│  │  │ • deactivateAdminAccount() [Super Admin]                ││      │
│  │  └──────────────────────────────────────────────────────────┘│      │
│  └────────┬─────────────────────────────────────────────────────┘      │
│           │                                                            │
│  ┌────────▼─────────────────────────────────────────────────────┐      │
│  │            MODEL LAYER (Data & Schema)                       │      │
│  │  ┌──────────────────────────────────────────────────────────┐│      │
│  │  │            Admin Schema                                 ││      │
│  │  │  ┌────────────────────────────────────────────────────┐ ││      │
│  │  │  │ Base Fields (inherited from User):                │ ││      │
│  │  │  │ • firstName, lastName, email                      │ ││      │
│  │  │  │ • password (bcrypt hashed)                        │ ││      │
│  │  │  │ • phone, gender, dateOfBirth                      │ ││      │
│  │  │  │ • profilePicture, bio                             │ ││      │
│  │  │  │ • timestamps (createdAt, updatedAt)              │ ││      │
│  │  │  │                                                    │ ││      │
│  │  │  │ Admin-Specific Fields:                            │ ││      │
│  │  │  │ • role: [super_admin|admin|moderator]            │ ││      │
│  │  │  │ • permissions: [array of 6 permissions]          │ ││      │
│  │  │  │ • isActive: boolean (default: true)              │ ││      │
│  │  │  │ • lastLogin: timestamp                           │ ││      │
│  │  │  │                                                    │ ││      │
│  │  │  │ Schema Methods:                                   │ ││      │
│  │  │  │ • generateToken() → JWT (24h expiry)            │ ││      │
│  │  │  │ • comparePassword(pwd) → boolean                │ ││      │
│  │  │  │ • hasPermission(perm) → boolean                 │ ││      │
│  │  │  └────────────────────────────────────────────────────┘ ││      │
│  │  └──────────────────────────────────────────────────────────┘│      │
│  └────────┬──────────────────────────────────────────────────────┘      │
└───────────┼──────────────────────────────────────────────────────────────┘
            │
┌───────────▼──────────────────────────────────────────────────────────────┐
│                      DATABASE LAYER (MongoDB)                            │
├──────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  ┌────────────────────────────────────────────────────────────────┐    │
│  │              Admin Collection                                  │    │
│  │  ┌─────────────────────────────────────────────────────────┐  │    │
│  │  │ {                                                       │  │    │
│  │  │   "_id": ObjectId,                                      │  │    │
│  │  │   "firstName": "John",                                  │  │    │
│  │  │   "lastName": "Admin",                                  │  │    │
│  │  │   "email": "admin@example.com",                         │  │    │
│  │  │   "password": "$2b$10$hashed_password...",             │  │    │
│  │  │   "role": "admin",                                      │  │    │
│  │  │   "permissions": [                                      │  │    │
│  │  │     "manage_users",                                     │  │    │
│  │  │     "manage_products",                                  │  │    │
│  │  │     "manage_orders",                                    │  │    │
│  │  │     "view_reports",                                     │  │    │
│  │  │     "manage_content"                                    │  │    │
│  │  │   ],                                                    │  │    │
│  │  │   "isActive": true,                                     │  │    │
│  │  │   "lastLogin": ISODate("2024-03-31T10:30:00Z"),        │  │    │
│  │  │   "createdAt": ISODate("2024-01-15T08:00:00Z"),        │  │    │
│  │  │   "updatedAt": ISODate("2024-03-31T10:30:00Z")         │  │    │
│  │  │ }                                                       │  │    │
│  │  └─────────────────────────────────────────────────────────┘  │    │
│  └────────────────────────────────────────────────────────────────┘    │
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘
```

---

## Data Flow Diagram

### Admin Login Flow

```
┌──────────────┐
│ Admin enters │
│ credentials  │
└──────┬───────┘
       │
       ▼
┌────────────────────────────────────┐
│ Frontend: POST /api/auth/admin/login│
│ Body: { email, password }           │
└──────┬─────────────────────────────┘
       │
       ▼
┌────────────────────────────────────────────┐
│ Server: loginAdmin Controller              │
│ 1. Validate input                          │
│ 2. Query DB for admin with email           │
│ 3. Compare password with bcrypt            │
│ 4. Update lastLogin timestamp              │
│ 5. Generate JWT token                      │
└──────┬─────────────────────────────────────┘
       │
       ▼
┌────────────────────────────────────────────┐
│ Response: 200 OK                           │
│ {                                          │
│   "token": "eyJhbGciOiJIUzI1NiIs...",    │
│   "adminId": "507f1f77bcf86cd799439011",  │
│   "role": "admin",                         │
│   "permissions": [...]                     │
│ }                                          │
└──────┬─────────────────────────────────────┘
       │
       ▼
┌────────────────────────────────────────────┐
│ Frontend: Store in localStorage            │
│ • adminToken                               │
│ • adminRole                                │
│ • adminPermissions                         │
│ • adminId                                  │
└────────────────────────────────────────────┘
```

### Protected Request Flow

```
┌──────────────────────────────────┐
│ Admin clicks on protected action  │
└──────┬───────────────────────────┘
       │
       ▼
┌────────────────────────────────────────────┐
│ Frontend: Include token in header          │
│ GET /api/auth/admin/profile                │
│ Authorization: Bearer eyJhbGciOiJIUzI1NiIs │
└──────┬─────────────────────────────────────┘
       │
       ▼
┌────────────────────────────────────────────┐
│ Server: adminAuthMiddleware                │
│ 1. Extract token from Authorization header │
│ 2. Verify JWT signature                    │
│ 3. Check token not expired                 │
│ 4. Fetch admin from DB                     │
│ 5. Check isActive = true                   │
│ 6. Attach admin to req.admin               │
│ 7. Call next()                             │
└──────┬─────────────────────────────────────┘
       │
       ▼
  ┌────────────────────────┐
  │ Has Required           │
  │ Permission/Role?       │
  └────┬──────────┬────────┘
       │          │
    YES│          │NO
       │          ▼
       │   ┌──────────────┐
       │   │ Return 403   │
       │   │ Forbidden    │
       │   └──────────────┘
       │
       ▼
┌────────────────────────────────────┐
│ Controller Function (protected)     │
│ req.admin is available              │
└──────┬─────────────────────────────┘
       │
       ▼
┌────────────────────────────────────┐
│ Return Response: 200 OK             │
│ {                                  │
│   "msg": "...",                    │
│   "admin": { ... }                 │
│ }                                  │
└────────────────────────────────────┘
```

---

## Role & Permission Hierarchy

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│                        Super Admin                         │
│            (Highest privilege - all permissions)           │
│                         △△△△△                              │
│              / │ │ │ │ │ │ │ │ │ │ \                      │
│            /   │ │ │ │ │ │ │ │ │ │   \                    │
│          /     │ │ │ │ │ │ │ │ │ │     \                  │
│        /       │ │ │ │ │ │ │ │ │ │       \                │
│      /         │ │ │ │ │ │ │ │ │ │         \              │
│    ▼           │ │ │ │ │ │ │ │ │ │           ▼            │
│  Admin        │ │ │ │ │ │ │ │ │ │ ├─ manage_users      │
│ (5 perms)     │ │ │ │ │ │ │ │ │ │ ├─ manage_products   │
│               │ │ │ │ │ │ │ │ │ │ ├─ manage_orders     │
│               │ │ │ │ │ │ │ │ │ │ ├─ view_reports      │
│               │ │ │ │ │ │ │ │ │ │ ├─ manage_content    │
│               │ │ │ │ │ │ │ │ │ │ │                     │
│    ▼           │ │ │ │ │ │ │ │ │ │           ▼           │
│  Moderator    │ │ │ │ │ │ │ │ │ │ ├─ view_reports      │
│ (2 perms)     │ │ │ │ │ │ │ │ │ │ └─ manage_content    │
│               │ │ │ │ │ │ │ │ │ │                       │
│               └─┴─┴─┴─┴─┴─┴─┴─┴─┴─ manage_admins       │
│                 (Super Admin Only)                       │
└─────────────────────────────────────────────────────────────┘
```

---

## Request/Response Examples

### Example 1: Successful Login

```
REQUEST:
POST /api/auth/admin/login HTTP/1.1
Host: localhost:3000
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "admin123"
}

RESPONSE (200 OK):
{
  "msg": "Admin login successful!",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoiNTA3ZjFmNzdiY2Y4NmNkNzk5NDM5MDExIiwiZW1haWwiOiJhZG1pbkBleGFtcGxlLmNvbSIsImZpcnN0TmFtZSI6IkpvaG4iLCJsYXN0TmFtZSI6IkFkbWluIiwicm9sZSI6ImFkbWluIiwicGVybWlzc2lvbnMiOlsibWFuYWdlX3VzZXJzIiwibWFuYWdlX3Byb2R1Y3RzIiwibWFuYWdlX29yZGVycyIsInZpZXdfcmVwb3J0cyIsIm1hbmFnZV9jb250ZW50Il0sImlhdCI6MTcxMTE4NzAwMCwiZXhwIjoxNzExMjczNDAwfQ.SIGNATURE",
  "adminId": "507f1f77bcf86cd799439011",
  "role": "admin",
  "permissions": [
    "manage_users",
    "manage_products",
    "manage_orders",
    "view_reports",
    "manage_content"
  ]
}
```

### Example 2: Unauthorized Access (Missing Token)

```
REQUEST:
GET /api/auth/admin/profile HTTP/1.1
Host: localhost:3000

RESPONSE (401 Unauthorized):
{
  "error": "Unauthorized HTTP, Token not provided !",
  "statusCode": 401
}
```

### Example 3: Insufficient Permission

```
REQUEST:
DELETE /api/products/123 HTTP/1.1
Host: localhost:3000
Authorization: Bearer [token_for_moderator]

RESPONSE (403 Forbidden):
{
  "error": "Permission denied. Required permission: manage_products",
  "statusCode": 403
}
```

---

## Security Flow

```
┌─────────────────────────────────────────────────────────┐
│            Password Hashing & Comparison                │
├─────────────────────────────────────────────────────────┤
│                                                         │
│ Registration:                                           │
│   Raw Password "admin123"                              │
│           ↓                                             │
│   bcrypt.genSalt(10)  ← Generate salt                  │
│           ↓                                             │
│   bcrypt.hash(password, salt) ← Hash with salt        │
│           ↓                                             │
│   Hashed: "$2b$10$kEqR..." ← Store in DB              │
│                                                         │
│ Login:                                                  │
│   Raw Password "admin123" (from request)               │
│           ↓                                             │
│   bcrypt.compare(rawPassword, hashedPassword)          │
│           ↓                                             │
│   True/False (constant time comparison)                │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## Token Structure

```
┌──────────────────────────────────────────────────┐
│          JWT Token Structure                     │
├──────────────────────────────────────────────────┤
│                                                  │
│ HEADER.PAYLOAD.SIGNATURE                         │
│                                                  │
│ HEADER:                                          │
│ {                                                │
│   "alg": "HS256",                               │
│   "typ": "JWT"                                  │
│ }                                                │
│                                                  │
│ PAYLOAD:                                         │
│ {                                                │
│   "adminId": "507f1f77bcf86cd799439011",       │
│   "email": "admin@example.com",                │
│   "firstName": "John",                          │
│   "lastName": "Admin",                          │
│   "role": "admin",                              │
│   "permissions": [                              │
│     "manage_users",                             │
│     "manage_products",                          │
│     "manage_orders",                            │
│     "view_reports",                             │
│     "manage_content"                            │
│   ],                                            │
│   "iat": 1711187000,  (issued at)              │
│   "exp": 1711273400   (expires in 24h)         │
│ }                                                │
│                                                  │
│ SIGNATURE:                                       │
│ HMACSHA256(                                      │
│   base64UrlEncode(header) + "." +              │
│   base64UrlEncode(payload),                     │
│   JWT_SECRET_KEY                               │
│ )                                                │
│                                                  │
└──────────────────────────────────────────────────┘
```

---

## File Structure Summary

```
server/
├── models/
│   ├── user.model.js              (User auth model)
│   ├── admin.model.js             (✨ NEW - Admin auth model)
│   ├── product.model.js           (Product model)
│   ├── order.model.js             (Order model)
│   ├── address.model.js           (Address model)
│   └── wishlist.model.js          (Wishlist model)
├── middlewares/
│   ├── user.middleware.js         (User auth middleware)
│   ├── admin.middleware.js        (✨ NEW - Admin auth + RBAC)
│   └── error.middleware.js        (Error handling)
├── controllers/
│   ├── user.controller.js         (User auth operations)
│   ├── admin.controller.js        (✨ NEW - Admin auth operations)
│   ├── product.controller.js      (Product operations)
│   ├── order.controller.js        (Order operations)
│   ├── address.controller.js      (Address operations)
│   └── wishlist.controller.js     (Wishlist operations)
├── routes/
│   ├── user.routes.js             (User endpoints)
│   ├── admin.routes.js            (✨ UPDATED - Admin endpoints)
│   ├── product.routes.js          (Product endpoints)
│   ├── order.routes.js            (Order endpoints)
│   └── ...
├── index.js                       (Main server file)
├── AUTH_DOCUMENTATION.md          (✨ NEW - Complete auth docs)
├── AUTH_SYSTEM_ARCHITECTURE.md    (✨ This file)
└── ADMIN_AUTH_IMPLEMENTATION.md   (✨ NEW - Implementation guide)

project_root/
├── ADMIN_AUTH_INTEGRATION_EXAMPLES.md (✨ NEW - Usage examples)
└── ...
```

---

## Summary

This architecture provides:

✅ **Separation of Concerns** - Clear layering (routes, middleware, controllers, models)
✅ **Security** - Bcrypt hashing, JWT validation, RBAC, permission checking
✅ **Scalability** - Easy to add new admins, roles, and permissions
✅ **Maintainability** - Well-documented, consistent patterns
✅ **Extensibility** - Can be enhanced with refresh tokens, 2FA, audit logs
✅ **Performance** - Permissions cached in JWT, minimal DB queries
✅ **Flexibility** - Works alongside existing user authentication

All files follow industry best practices and are production-ready!
