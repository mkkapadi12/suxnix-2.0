# Admin Authentication Implementation Summary

## 📋 Overview

This document summarizes the complete admin authentication system that has been implemented alongside the existing user authentication.

---

## ✅ What Was Implemented

### 1. Admin Model (`server/models/admin.model.js`)

A comprehensive MongoDB schema with:

- **Base fields**: firstName, lastName, email, password, profilePicture, phone, gender, dateOfBirth, bio
- **Admin-specific fields**:
  - `role`: super_admin, admin, or moderator
  - `permissions`: Array of action permissions
  - `isActive`: Account status flag
  - `lastLogin`: Tracks last login time

**Key Methods:**

- `generateToken()` - Creates JWT with 24h expiry including role & permissions
- `comparePassword()` - Securely compares passwords using bcrypt
- `hasPermission()` - Checks if admin has specific permission

### 2. Admin Middleware (`server/middlewares/admin.middleware.js`)

Three powerful middleware functions:

| Middleware                | Purpose                                | Returns                           |
| ------------------------- | -------------------------------------- | --------------------------------- |
| `adminAuthMiddleware`     | Validates JWT and admin account status | req.admin, req.adminId, req.token |
| `requirePermission(perm)` | Checks for specific permission         | 403 if denied                     |
| `requireRole(role)`       | Checks for minimum role level          | 403 if denied                     |

**Features:**

- JWT verification and validation
- Active status checking
- Permission-based access control
- Role-based access control
- Super admin role bypass for all restrictions

### 3. Admin Controller (`server/controllers/admin.controller.js`)

Nine comprehensive controller functions:

| Function                        | Purpose                       | Auth Required | Admin-Only |
| ------------------------------- | ----------------------------- | ------------- | ---------- |
| `registerAdmin`                 | Create new admin account      | ❌            | ❌         |
| `loginAdmin`                    | Admin login with credentials  | ❌            | ❌         |
| `getAdminProfile`               | Retrieve admin profile        | ✅            | ❌         |
| `updateAdminProfile`            | Update profile information    | ✅            | ❌         |
| `changePassword`                | Change admin password         | ✅            | ❌         |
| `deactivateAdmin`               | Deactivate own account        | ✅            | ❌         |
| `getAllAdmins`                  | List all admins               | ✅            | ✅         |
| `updateAdminRoleAndPermissions` | Change admin role/permissions | ✅            | ✅         |
| `deactivateAdminAccount`        | Deactivate other admins       | ✅            | ✅         |

### 4. Admin Routes (`server/routes/admin.routes.js`)

9 API endpoints organized by permission level:

```
POST   /api/auth/admin/register
POST   /api/auth/admin/login
GET    /api/auth/admin/profile          [authMiddleware]
PUT    /api/auth/admin/profile          [authMiddleware]
POST   /api/auth/admin/change-password  [authMiddleware]
POST   /api/auth/admin/deactivate       [authMiddleware]
GET    /api/auth/admin/all              [authMiddleware + adminRole]
PUT    /api/auth/admin/update-role/:id  [authMiddleware + adminRole]
POST   /api/auth/admin/deactivate/:id   [authMiddleware + adminRole]
```

---

## 🔐 Role & Permission System

### Role Hierarchy

```
┌─────────────────────────────────────────────┐
│         Super Admin (Highest)               │
│  • All permissions automatically            │
│  • Can manage all admin accounts            │
│  • Can modify any admin role/permissions    │
├─────────────────────────────────────────────┤
│         Admin (Standard)                    │
│  • manage_users                             │
│  • manage_products                          │
│  • manage_orders                            │
│  • view_reports                             │
│  • manage_content                           │
├─────────────────────────────────────────────┤
│         Moderator (Limited)                 │
│  • view_reports                             │
│  • manage_content                           │
└─────────────────────────────────────────────┘
```

### Available Permissions

| Permission        | Purpose                                    |
| ----------------- | ------------------------------------------ |
| `manage_users`    | Create, read, update, delete user accounts |
| `manage_products` | Create, read, update, delete products      |
| `manage_orders`   | Create, read, update, delete orders        |
| `manage_admins`   | Create and manage admin accounts           |
| `view_reports`    | Access reporting and analytics             |
| `manage_content`  | Manage website content and media           |

---

## 🔒 Security Features

### 1. Password Security

- ✅ Bcrypt hashing (10 salt rounds)
- ✅ Minimum 6 characters required
- ✅ Passwords never exposed in responses
- ✅ Constant-time comparison prevents timing attacks

### 2. JWT Token Security

- ✅ Signed with `JWT_SECRET_KEY` environment variable
- ✅ Token includes role & permissions for quick authorization
- ✅ Admin tokens expire in 24 hours
- ✅ User tokens expire in 1 hour

### 3. Account Security

- ✅ Admin accounts can be deactivated
- ✅ Inactive accounts blocked from login
- ✅ Activity tracking (lastLogin)
- ✅ Account status verified on every request

### 4. Authorization

- ✅ Three-level authorization system:
  1. **Authentication**: Is the token valid?
  2. **Role-based**: Does the user have the right role?
  3. **Permission-based**: Does the user have the specific permission?

### 5. Input Validation

- ✅ Required field validation
- ✅ Email uniqueness checking
- ✅ Password confirmation matching
- ✅ String length constraints
- ✅ Enum validation for roles

---

## 📊 User vs Admin Authentication Comparison

| Feature                 | User Auth           | Admin Auth                  |
| ----------------------- | ------------------- | --------------------------- |
| **Model**               | Simple user profile | Role-based with permissions |
| **Password Hashing**    | Bcrypt ✅           | Bcrypt ✅                   |
| **JWT Expiry**          | 1 hour              | 24 hours                    |
| **Roles**               | ❌ Not supported    | ✅ 3 levels                 |
| **Permissions**         | ❌ Not supported    | ✅ 6 permissions            |
| **Account Status**      | ❌ Not tracked      | ✅ isActive flag            |
| **Last Login**          | ❌ Not tracked      | ✅ lastLogin                |
| **Permission Checking** | N/A                 | ✅ 2 middleware             |
| **Admin Management**    | N/A                 | ✅ Manage other admins      |

---

## 🚀 Usage Examples

### Admin Registration with Default Role

```bash
curl -X POST http://localhost:3000/api/auth/admin/register \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Admin",
    "email": "john.admin@example.com",
    "password": "securepass123",
    "confirmPassword": "securepass123"
  }'

Response: {
  "msg": "Admin registration successful!",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "adminId": "507f1f77bcf86cd799439011",
  "role": "admin"
}
```

### Admin Login

```bash
curl -X POST http://localhost:3000/api/auth/admin/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john.admin@example.com",
    "password": "securepass123"
  }'

Response: {
  "msg": "Admin login successful!",
  "token": "eyJhbGciOiJIUzI1NiIs...",
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

### Using Admin Token to Get Profile

```bash
curl -X GET http://localhost:3000/api/auth/admin/profile \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIs..."

Response: {
  "msg": "Admin profile retrieved successfully!",
  "admin": {
    "_id": "507f1f77bcf86cd799439011",
    "firstName": "John",
    "lastName": "Admin",
    "email": "john.admin@example.com",
    "role": "admin",
    "permissions": [...],
    "isActive": true,
    "lastLogin": "2024-03-31T10:30:00Z"
  }
}
```

---

## 📁 File Structure

```
server/
├── models/
│   ├── user.model.js          (User schema with auth methods)
│   └── admin.model.js         (✨ NEW - Admin schema with role/permission)
├── middlewares/
│   ├── user.middleware.js     (User authentication)
│   ├── admin.middleware.js    (✨ NEW - Admin auth + role/permission checks)
│   └── error.middleware.js    (Error handling)
├── controllers/
│   ├── user.controller.js     (User auth operations)
│   └── admin.controller.js    (✨ NEW - Admin auth operations)
├── routes/
│   ├── user.routes.js         (User endpoints)
│   ├── admin.routes.js        (✨ UPDATED - Admin endpoints)
│   └── product.routes.js
├── index.js                   (Already configured with admin routes)
└── AUTH_DOCUMENTATION.md      (✨ NEW - Complete auth documentation)
```

---

## ✨ Key Improvements Over User Auth

1. **Role-Based Access Control (RBAC)**
   - Hierarchical role system
   - Permissions baked into JWT for performance

2. **Enhanced Security**
   - Account status tracking
   - Longer token expiry (24h vs 1h)
   - Permission checking on every request

3. **Admin Management**
   - Super admins can manage other admin accounts
   - Dynamic permission assignment
   - Account deactivation capabilities

4. **Activity Tracking**
   - Last login timestamps
   - Proper audit trail foundation

5. **Comprehensive API**
   - 9 endpoints covering all common admin operations
   - Clear separation of public, protected, and admin-only routes

---

## 🔧 How to Test

### Test Admin Registration

```bash
# Register
POST /api/auth/admin/register
{
  "firstName": "Test",
  "lastName": "Admin",
  "email": "test@admin.com",
  "password": "test123",
  "confirmPassword": "test123"
}
```

### Test Admin Login

```bash
# Login
POST /api/auth/admin/login
{
  "email": "test@admin.com",
  "password": "test123"
}
# Copy the token from response
```

### Test Protected Endpoint

```bash
# Get Profile
GET /api/auth/admin/profile
Header: Authorization: Bearer [YOUR_TOKEN]
```

### Test Permission Checking

Any endpoint with `requirePermission` or `requireRole` will return 403 if:

- Token is missing or invalid
- Admin account is inactive
- Admin doesn't have required permissions
- Admin doesn't have required role

---

## 🎯 Integration Points

The admin authentication system integrates seamlessly with:

- ✅ Existing user auth system (separate tokens)
- ✅ MongoDB database (admin collection)
- ✅ JWT token validation
- ✅ Error middleware (centralized error handling)
- ✅ Express routing (already configured in server/index.js)

---

## 📝 Next Steps

To use this admin auth system in your application:

1. **Ensure Environment Variables**

   ```env
   JWT_SECRET_KEY=your_secret_key_here
   MONGO_URI=mongodb://...
   ```

2. **Create First Admin** (Super Admin)
   - Call `/api/auth/admin/register` with role `super_admin`
   - This super admin can then create and manage other admins

3. **Protect Admin Routes**
   - Import middleware: `const { adminAuthMiddleware, requireRole } = require('./middlewares/admin.middleware');`
   - Apply to routes: `router.delete('/users/:id', adminAuthMiddleware, requireRole('admin'), deleteUser);`

4. **Use Permissions in Controllers**
   - Check permissions before operations
   - Use `req.admin.hasPermission('manage_users')` in controllers

---

## 📚 Documentation

- **Complete API Documentation**: See `AUTH_DOCUMENTATION.md`
- **Code Comments**: All files are well-commented
- **Example Usage**: Provided in this file and documentation

---

**Status**: ✅ Complete and ready for integration
**Created**: 2024
**Last Updated**: March 31, 2026
