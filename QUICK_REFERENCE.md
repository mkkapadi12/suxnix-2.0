# Quick Reference Guide - Admin Authentication

## File Locations

| File | Location | Purpose |
|------|----------|---------|
| Admin Model | `server/models/admin.model.js` | Schema with auth methods |
| Admin Middleware | `server/middlewares/admin.middleware.js` | JWT validation & RBAC |
| Admin Controller | `server/controllers/admin.controller.js` | Business logic |
| Admin Routes | `server/routes/admin.routes.js` | API endpoints |
| Full Documentation | `AUTH_DOCUMENTATION.md` | Complete reference |
| Implementation Guide | `ADMIN_AUTH_IMPLEMENTATION.md` | Setup & overview |
| Architecture | `AUTH_SYSTEM_ARCHITECTURE.md` | Diagrams & flows |
| Integration Examples | `ADMIN_AUTH_INTEGRATION_EXAMPLES.md` | Code examples |

---

## API Endpoints Quick Reference

### Public Endpoints
```
POST /api/auth/admin/register
POST /api/auth/admin/login
```

### Protected Endpoints (Requires `adminAuthMiddleware`)
```
GET    /api/auth/admin/profile
PUT    /api/auth/admin/profile
POST   /api/auth/admin/change-password
POST   /api/auth/admin/deactivate
```

### Admin-Only Endpoints (Requires `adminAuthMiddleware` + `requireRole('admin')`)
```
GET    /api/auth/admin/all
PUT    /api/auth/admin/update-role/:adminId
POST   /api/auth/admin/deactivate/:adminId
```

---

## Middleware Usage

### Basic Authentication
```javascript
const { adminAuthMiddleware } = require('../middlewares/admin.middleware');

router.get('/profile', adminAuthMiddleware, getAdminProfile);
```

### Permission-Based
```javascript
const { adminAuthMiddleware, requirePermission } = require('../middlewares/admin.middleware');

router.delete(
  '/products/:id',
  adminAuthMiddleware,
  requirePermission('manage_products'),
  deleteProduct
);
```

### Role-Based
```javascript
const { adminAuthMiddleware, requireRole } = require('../middlewares/admin.middleware');

router.post(
  '/manage-admins',
  adminAuthMiddleware,
  requireRole('admin'),
  manageAdmins
);
```

---

## Roles & Permissions Quick Chart

| Role | All Permissions | Use Case |
|------|-----------------|----------|
| **super_admin** | ✅ All 6 permissions | System owner |
| **admin** | ✅ 5 permissions (all except manage_admins) | Main admin |
| **moderator** | ✅ 2 permissions (view_reports, manage_content) | Content moderator |

### Permission Details

| Permission | Purpose |
|-----------|---------|
| `manage_users` | Create, read, update, delete user accounts |
| `manage_products` | Create, read, update, delete products |
| `manage_orders` | Create, read, update, delete orders |
| `manage_admins` | Create and manage other admin accounts |
| `view_reports` | Access analytics and reports |
| `manage_content` | Manage website content and media |

---

## Request Headers

All protected requests must include:
```
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json
```

Example:
```javascript
fetch('/api/auth/admin/profile', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIs...',
    'Content-Type': 'application/json'
  }
})
```

---

## Response Status Codes

| Code | Meaning | Example |
|------|---------|---------|
| 200 | Success | Login successful |
| 201 | Created | Admin registered |
| 400 | Bad Request | Missing fields |
| 401 | Unauthorized | Invalid token |
| 403 | Forbidden | No permission |
| 404 | Not Found | Admin not found |
| 409 | Conflict | Email already exists |

---

## Environment Variables Required

```env
JWT_SECRET_KEY=your_secret_key_here
MONGO_URI=mongodb://...
PORT=3000
```

---

## Admin Model Fields

### Base Fields
```javascript
firstName: String (required)
lastName: String (required)
email: String (required, unique)
password: String (required, min 6, hashed)
phone: Number
gender: String (Male/Female/Other)
dateOfBirth: Date
profilePicture: String
bio: String (max 500 chars)
```

### Admin-Specific Fields
```javascript
role: String (super_admin, admin, moderator)
permissions: Array (up to 6 permissions)
isActive: Boolean (default: true)
lastLogin: Date
```

---

## Key Methods

### generateToken()
Generates JWT token with 24-hour expiry.
```javascript
const token = await admin.generateToken();
```

### comparePassword(password)
Safely compares provided password with hash.
```javascript
const isMatch = await admin.comparePassword('password123');
```

### hasPermission(permission)
Checks if admin has specific permission.
```javascript
if (admin.hasPermission('manage_users')) {
  // Admin can manage users
}
```

---

## Creating First Admin (Super Admin)

```bash
curl -X POST http://localhost:3000/api/auth/admin/register \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "System",
    "lastName": "Admin",
    "email": "superadmin@example.com",
    "password": "strongpassword123",
    "confirmPassword": "strongpassword123",
    "role": "super_admin"
  }'
```

---

## Testing with cURL

### Register
```bash
curl -X POST http://localhost:3000/api/auth/admin/register \
  -H "Content-Type: application/json" \
  -d '{"firstName":"John","lastName":"Doe","email":"john@example.com","password":"pass123","confirmPassword":"pass123"}'
```

### Login
```bash
curl -X POST http://localhost:3000/api/auth/admin/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"pass123"}'
```

### Get Profile (replace TOKEN)
```bash
curl -X GET http://localhost:3000/api/auth/admin/profile \
  -H "Authorization: Bearer TOKEN"
```

### Update Profile
```bash
curl -X PUT http://localhost:3000/api/auth/admin/profile \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"phone":"1234567890"}'
```

---

## Common Errors & Solutions

| Error | Cause | Solution |
|-------|-------|----------|
| "Token not provided" | Missing Authorization header | Include `Authorization: Bearer <token>` |
| "Invalid Token" | Token expired or tampered | Login again to get new token |
| "Permission denied" | Admin lacks permission | Change admin role/permissions |
| "Admin not found" | Email doesn't exist | Check email spelling |
| "Invalid credentials" | Wrong password | Verify password |
| "Email already exists" | Duplicate registration | Use different email |

---

## Migration Path from User to Admin

If migrating existing users to admins:

```javascript
// Example: Convert user to admin
const user = await USER.findById(userId);
const admin = new ADMIN({
  firstName: user.firstName,
  lastName: user.lastName,
  email: user.email,
  password: user.password,  // Already hashed
  role: 'admin',
  permissions: ['manage_users', 'manage_products', 'manage_orders', 'view_reports', 'manage_content'],
  isActive: true
});
await admin.save();
```

---

## Security Checklist

- ✅ Passwords hashed with bcrypt (10 rounds)
- ✅ JWT signed with secret key
- ✅ Tokens expire (24 hours for admins)
- ✅ Active status checked on requests
- ✅ Permissions validated before operations
- ✅ Role hierarchy enforced
- ✅ Password comparison is constant-time
- ✅ Sensitive data excluded from responses

---

## Performance Tips

1. **Token Caching**: Permissions included in JWT to avoid DB queries
2. **Super Admin Bypass**: Super admins don't need individual permission checks
3. **Index Email**: Ensure `admin.email` is indexed in MongoDB
4. **Token Expiry**: 24 hours is reasonable; adjust based on security needs
5. **Refresh Tokens**: Consider implementing refresh tokens for long sessions

---

## Next Steps

1. **Copy provided files** to your server directory
2. **Update import paths** if needed
3. **Test endpoints** with provided cURL examples
4. **Integrate middleware** into your routes
5. **Add to frontend** using provided service examples
6. **Monitor logs** for any authentication issues

---

## Support & Help

For complete information, refer to:
- `AUTH_DOCUMENTATION.md` - Full technical reference
- `AUTH_SYSTEM_ARCHITECTURE.md` - System design & diagrams
- `ADMIN_AUTH_INTEGRATION_EXAMPLES.md` - Code examples
- `ADMIN_AUTH_IMPLEMENTATION.md` - Implementation details

---

**Version**: 1.0
**Status**: Production Ready ✅
**Last Updated**: March 31, 2026
