# Authentication System Documentation

## Overview

This document outlines the complete authentication system for both **User** and **Admin** roles in the application.

---

## Architecture Overview

### Auth Structure Components

1. **Models**: Define data schemas and methods
2. **Middleware**: Handle authentication and authorization
3. **Controllers**: Business logic for auth operations
4. **Routes**: API endpoints

---

## User Authentication

### User Model (`server/models/user.model.js`)

**Fields:**
- `firstName` (String, Required)
- `lastName` (String, Required)
- `email` (String, Required, Unique)
- `password` (String, Required, Min 6 chars, Hashed with bcrypt)
- `confirmPassword` (String, Required for validation)
- `profilePicture` (String, Optional)
- `phone` (Number, Optional)
- `gender` (String, Enum: Male, Female, Other)
- `dateOfBirth` (Date, Optional)
- `bio` (String, Max 500 chars)
- `addresses` (Array of Address ObjectIds)
- `timestamps` (createdAt, updatedAt)

**Methods:**
- `generateToken()` - Generates JWT token (1 hour expiry)
- `comparePassword(password)` - Compares provided password with hashed password

**Security:**
- Passwords are hashed using bcrypt with 10 salt rounds before saving
- JWT tokens include: userId, email, firstName, lastName
- Token secret: `process.env.JWT_SECRET_KEY`

---

### User Middleware (`server/middlewares/user.middleware.js`)

**Function:** `authMiddleware(req, res, next)`

**Behavior:**
- Extracts JWT token from Authorization header (`Bearer <token>`)
- Verifies token validity
- Fetches user data and attaches to `req.user`
- Throws 401 error if token is missing or invalid

**Usage:**
```javascript
router.get('/profile', authMiddleware, getProfile);
```

---

### User Controller (`server/controllers/user.controller.js`)

**Endpoints:**

1. **Register User**
   - Route: `POST /api/auth/users/register`
   - Body: `{ firstName, lastName, email, password, confirmPassword }`
   - Response: `{ msg, token, userId }`

2. **Login User**
   - Route: `POST /api/auth/users/login`
   - Body: `{ email, password }`
   - Response: `{ msg, token, userId }`

3. **Get Profile**
   - Route: `GET /api/auth/users/profile`
   - Middleware: `authMiddleware`
   - Response: `{ msg, user }`

4. **Update Profile**
   - Route: `PUT /api/auth/users/profile`
   - Middleware: `authMiddleware`
   - Body: `{ firstName, lastName, phone, gender, dateOfBirth, bio, profilePicture }`
   - Response: `{ msg, user }`

---

## Admin Authentication

### Admin Model (`server/models/admin.model.js`)

**Base Fields:** (Same as User)
- firstName, lastName, email, password, confirmPassword
- profilePicture, phone, gender, dateOfBirth, bio
- timestamps

**Additional Admin Fields:**

| Field | Type | Options | Default | Description |
|-------|------|---------|---------|-------------|
| `role` | String | super_admin, admin, moderator | admin | Admin permission level |
| `permissions` | Array | manage_users, manage_products, manage_orders, manage_admins, view_reports, manage_content | Based on role | Specific action permissions |
| `isActive` | Boolean | true/false | true | Admin account status |
| `lastLogin` | Date | Any date | null | Last login timestamp |

**Methods:**
- `generateToken()` - JWT with 24 hour expiry, includes role & permissions
- `comparePassword(password)` - Bcrypt comparison
- `hasPermission(permission)` - Checks if admin has specific permission

**Permission Matrix:**

| Role | Permissions |
|------|-------------|
| `super_admin` | ALL (manage_users, manage_products, manage_orders, manage_admins, view_reports, manage_content) |
| `admin` | manage_users, manage_products, manage_orders, view_reports, manage_content |
| `moderator` | view_reports, manage_content |

---

### Admin Middleware (`server/middlewares/admin.middleware.js`)

**Functions:**

1. **`adminAuthMiddleware(req, res, next)`**
   - Validates JWT token
   - Verifies admin account is active
   - Attaches admin data to `req.admin`
   - Errors: 401 (invalid token), 403 (inactive account), 404 (not found)

2. **`requirePermission(requiredPermission)`**
   - Higher-order middleware for permission checking
   - Returns 403 if permission not found
   - Usage:
   ```javascript
   router.delete(
     '/products/:id',
     adminAuthMiddleware,
     requirePermission('manage_products'),
     deleteProduct
   );
   ```

3. **`requireRole(requiredRole)`**
   - Higher-order middleware for role checking
   - Super admin bypasses all role checks
   - Usage:
   ```javascript
   router.post(
     '/manage-admins',
     adminAuthMiddleware,
     requireRole('admin'),
     manageAdmins
   );
   ```

---

### Admin Controller (`server/controllers/admin.controller.js`)

**Endpoints:**

#### Public Routes

1. **Register Admin**
   - Route: `POST /api/auth/admin/register`
   - Body: `{ firstName, lastName, email, password, confirmPassword, role?, permissions? }`
   - Response: `{ msg, token, adminId, role }`
   - Note: Role and permissions auto-assigned based on role if not provided

2. **Login Admin**
   - Route: `POST /api/auth/admin/login`
   - Body: `{ email, password }`
   - Response: `{ msg, token, adminId, role, permissions }`
   - Updates `lastLogin` timestamp

#### Protected Routes (Require `adminAuthMiddleware`)

3. **Get Admin Profile**
   - Route: `GET /api/auth/admin/profile`
   - Response: `{ msg, admin }`

4. **Update Admin Profile**
   - Route: `PUT /api/auth/admin/profile`
   - Body: `{ firstName, lastName, phone, gender, dateOfBirth, bio, profilePicture }`
   - Response: `{ msg, admin }`

5. **Change Password**
   - Route: `POST /api/auth/admin/change-password`
   - Body: `{ currentPassword, newPassword, confirmPassword }`
   - Response: `{ msg }`
   - Validations: All fields required, passwords must match, min 6 chars

6. **Deactivate Own Account**
   - Route: `POST /api/auth/admin/deactivate`
   - Response: `{ msg, admin }`

#### Super Admin Routes (Require `adminAuthMiddleware` + `requireRole('admin')`)

7. **Get All Admins**
   - Route: `GET /api/auth/admin/all`
   - Response: `{ msg, count, admins }`

8. **Update Admin Role and Permissions**
   - Route: `PUT /api/auth/admin/update-role/:adminId`
   - Body: `{ role, permissions? }`
   - Response: `{ msg, admin }`

9. **Deactivate Another Admin**
   - Route: `POST /api/auth/admin/deactivate/:adminId`
   - Response: `{ msg, admin }`

---

## Security Features

### Password Security
- Bcrypt hashing with 10 salt rounds
- Minimum 6 characters required
- Passwords never returned in responses
- Password comparison using bcrypt to prevent timing attacks

### JWT Tokens
- Signed with `process.env.JWT_SECRET_KEY`
- User tokens: 1 hour expiry
- Admin tokens: 24 hour expiry
- Tokens include role and permission data for quicker authorization

### Authorization Levels
1. **Public**: No authentication required
2. **User-Protected**: Requires valid user JWT
3. **Admin-Protected**: Requires valid admin JWT
4. **Role-Protected**: Requires specific role (admin/super_admin)
5. **Permission-Protected**: Requires specific permission

### Account Status
- Admin accounts can be deactivated
- Inactive admins cannot login
- Active status check on every protected request

---

## Environment Variables Required

```env
JWT_SECRET_KEY=your_secret_key_here
MONGO_URI=mongodb://...
PORT=3000
```

---

## Usage Examples

### User Login and Profile Access

```bash
# Register
POST /api/auth/users/register
Body: {
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "password123",
  "confirmPassword": "password123"
}

# Login
POST /api/auth/users/login
Body: {
  "email": "john@example.com",
  "password": "password123"
}
Response: {
  "msg": "Login successful!",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "userId": "507f1f77bcf86cd799439011"
}

# Get Profile (with token)
GET /api/auth/users/profile
Header: Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

### Admin Login and Management

```bash
# Register Admin
POST /api/auth/admin/register
Body: {
  "firstName": "Admin",
  "lastName": "User",
  "email": "admin@example.com",
  "password": "admin123",
  "confirmPassword": "admin123",
  "role": "admin"
}

# Login Admin
POST /api/auth/admin/login
Body: {
  "email": "admin@example.com",
  "password": "admin123"
}
Response: {
  "msg": "Admin login successful!",
  "token": "...",
  "adminId": "...",
  "role": "admin",
  "permissions": ["manage_users", "manage_products", ...]
}

# Get Admin Profile (with token)
GET /api/auth/admin/profile
Header: Authorization: Bearer eyJhbGciOiJIUzI1NiIs...

# Change Password
POST /api/auth/admin/change-password
Body: {
  "currentPassword": "admin123",
  "newPassword": "newpassword123",
  "confirmPassword": "newpassword123"
}
```

---

## Error Handling

All errors are handled by the centralized error middleware (`server/middlewares/error.middleware.js`).

**Common Status Codes:**
- `200` - Success
- `201` - Created/Registered successfully
- `400` - Bad request (missing fields, validation error)
- `401` - Unauthorized (invalid token, invalid credentials)
- `403` - Forbidden (insufficient permissions, inactive account)
- `404` - Not found (user/admin not found)
- `409` - Conflict (email already exists)
- `500` - Server error

**Error Response Format:**
```json
{
  "error": "Error message",
  "statusCode": 401
}
```

---

## Implementation Notes

1. **Token Verification**: Tokens are verified on every protected request
2. **Active Status Check**: Admin accounts are checked for active status
3. **Permission Caching**: Permissions included in JWT to avoid database queries
4. **Last Login Tracking**: Updated on every admin login
5. **Role-Based Access**: All admin management routes require admin role

---

## Future Enhancements

- Refresh token implementation for extended sessions
- Two-factor authentication (2FA)
- OAuth2 integration
- API key authentication for external services
- Audit logging for admin actions
- Rate limiting on auth endpoints
- Email verification for registrations
