# Admin Authentication Integration Examples

This document provides practical code examples for integrating the admin authentication system into your frontend and additional server-side operations.

---

## Frontend Integration (React/JavaScript)

### 1. Admin Login Service

```javascript
// src/services/adminAuthService.js
const API_BASE_URL =
  process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

export const adminAuthService = {
  // Login admin
  async loginAdmin(email, password) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      // Store token in localStorage
      localStorage.setItem('adminToken', data.token);
      localStorage.setItem('adminRole', data.role);
      localStorage.setItem(
        'adminPermissions',
        JSON.stringify(data.permissions),
      );
      localStorage.setItem('adminId', data.adminId);

      return {
        success: true,
        token: data.token,
        adminId: data.adminId,
        role: data.role,
        permissions: data.permissions,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  },

  // Get admin profile
  async getAdminProfile() {
    try {
      const token = localStorage.getItem('adminToken');

      if (!token) {
        throw new Error('No token found');
      }

      const response = await fetch(`${API_BASE_URL}/auth/admin/profile`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch profile');
      }

      return {
        success: true,
        admin: data.admin,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  },

  // Update admin profile
  async updateAdminProfile(updates) {
    try {
      const token = localStorage.getItem('adminToken');

      const response = await fetch(`${API_BASE_URL}/auth/admin/profile`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Update failed');
      }

      return {
        success: true,
        admin: data.admin,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  },

  // Change password
  async changePassword(currentPassword, newPassword, confirmPassword) {
    try {
      const token = localStorage.getItem('adminToken');

      const response = await fetch(
        `${API_BASE_URL}/auth/admin/change-password`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            currentPassword,
            newPassword,
            confirmPassword,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Password change failed');
      }

      return {
        success: true,
        message: data.msg,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  },

  // Logout
  logout() {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminRole');
    localStorage.removeItem('adminPermissions');
    localStorage.removeItem('adminId');
  },

  // Check if admin is authenticated
  isAuthenticated() {
    return !!localStorage.getItem('adminToken');
  },

  // Get stored admin info
  getAdminInfo() {
    return {
      token: localStorage.getItem('adminToken'),
      adminId: localStorage.getItem('adminId'),
      role: localStorage.getItem('adminRole'),
      permissions: JSON.parse(localStorage.getItem('adminPermissions') || '[]'),
    };
  },

  // Check if admin has permission
  hasPermission(permission) {
    const permissions = JSON.parse(
      localStorage.getItem('adminPermissions') || '[]',
    );
    return permissions.includes(permission);
  },

  // Check admin role
  getRole() {
    return localStorage.getItem('adminRole');
  },
};
```

### 2. Admin Login Component

```jsx
// src/components/AdminLogin.jsx
import React, { useState } from 'react';
import { adminAuthService } from '../services/adminAuthService';
import { useNavigate } from 'react-router-dom';

export function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await adminAuthService.loginAdmin(email, password);

    if (result.success) {
      // Redirect to admin dashboard
      navigate('/admin/dashboard');
    } else {
      setError(result.error);
    }

    setLoading(false);
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <h2>Admin Login</h2>

        {error && <div className="error-message">{error}</div>}

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}
```

### 3. Protected Admin Route Component

```jsx
// src/components/ProtectedAdminRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { adminAuthService } from '../services/adminAuthService';

export function ProtectedAdminRoute({ children, requiredPermission }) {
  const isAuthenticated = adminAuthService.isAuthenticated();
  const hasPermission =
    !requiredPermission || adminAuthService.hasPermission(requiredPermission);

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  if (!hasPermission) {
    return <Navigate to="/admin/unauthorized" replace />;
  }

  return children;
}
```

### 4. Admin Context/Hook

```javascript
// src/hooks/useAdmin.js
import { useState, useEffect } from 'react';
import { adminAuthService } from '../services/adminAuthService';

export function useAdmin() {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadAdminProfile = async () => {
      try {
        if (!adminAuthService.isAuthenticated()) {
          setAdmin(null);
          return;
        }

        const result = await adminAuthService.getAdminProfile();

        if (result.success) {
          setAdmin(result.admin);
        } else {
          setError(result.error);
          adminAuthService.logout();
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadAdminProfile();
  }, []);

  return {
    admin,
    loading,
    error,
    isAuthenticated: adminAuthService.isAuthenticated(),
    hasPermission: (permission) => adminAuthService.hasPermission(permission),
    getRole: () => adminAuthService.getRole(),
    logout: () => {
      adminAuthService.logout();
      setAdmin(null);
    },
  };
}
```

---

## Server-Side Integration Examples

### 1. Protected Product Routes (Example)

```javascript
// server/routes/product.routes.js
const express = require('express');
const router = express.Router();
const {
  adminAuthMiddleware,
  requirePermission,
} = require('../middlewares/admin.middleware');

// Get all products (public)
router.get('/', getAllProducts);

// Create product (admin only)
router.post(
  '/',
  adminAuthMiddleware,
  requirePermission('manage_products'),
  createProduct,
);

// Update product (admin only)
router.put(
  '/:id',
  adminAuthMiddleware,
  requirePermission('manage_products'),
  updateProduct,
);

// Delete product (admin only)
router.delete(
  '/:id',
  adminAuthMiddleware,
  requirePermission('manage_products'),
  deleteProduct,
);

module.exports = router;
```

### 2. Permission-Aware Controller

```javascript
// server/controllers/product.controller.js
const createProduct = async (req, res, next) => {
  try {
    // req.admin already available from middleware
    const adminId = req.admin._id;
    const adminRole = req.admin.role;

    // Create product
    const product = await Product.create({
      ...req.body,
      createdBy: adminId,
    });

    // Log admin action
    console.log(
      `[${new Date().toISOString()}] Admin ${adminId} created product ${product._id}`,
    );

    return res.status(201).json({
      msg: 'Product created successfully!',
      product,
    });
  } catch (error) {
    return next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const adminId = req.admin._id;

    // Check if admin can update (could add additional logic)
    const product = await Product.findById(id);

    if (!product) {
      const error = new Error('Product not found');
      error.statusCode = 404;
      return next(error);
    }

    // Update product
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
      returnDocument: 'after',
      runValidators: true,
    });

    // Log admin action
    console.log(
      `[${new Date().toISOString()}] Admin ${adminId} updated product ${id}`,
    );

    return res.status(200).json({
      msg: 'Product updated successfully!',
      product: updatedProduct,
    });
  } catch (error) {
    return next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const adminId = req.admin._id;

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      const error = new Error('Product not found');
      error.statusCode = 404;
      return next(error);
    }

    // Log admin action
    console.log(
      `[${new Date().toISOString()}] Admin ${adminId} deleted product ${id}`,
    );

    return res.status(200).json({
      msg: 'Product deleted successfully!',
    });
  } catch (error) {
    return next(error);
  }
};
```

### 3. Custom Middleware for Logging

```javascript
// server/middlewares/adminActionLog.middleware.js
const adminActionLog = (action) => {
  return (req, res, next) => {
    // Store original send function
    const originalSend = res.send;

    // Override send function
    res.send = function (data) {
      // Check if response was successful
      const statusCode = res.statusCode;

      if (statusCode < 400) {
        // Log successful admin action
        console.log(
          `[ADMIN ACTION] Admin: ${req.admin._id} | Action: ${action} | Status: ${statusCode} | Time: ${new Date().toISOString()}`,
        );

        // Could also save to database
        // AdminLog.create({
        //   adminId: req.admin._id,
        //   action: action,
        //   statusCode: statusCode,
        //   timestamp: new Date(),
        // });
      }

      // Call original send
      return originalSend.call(this, data);
    };

    next();
  };
};

module.exports = adminActionLog;
```

---

## Testing Examples

### 1. Using cURL for API Testing

```bash
# Admin Registration
curl -X POST http://localhost:3000/api/auth/admin/register \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Admin",
    "email": "admin@test.com",
    "password": "admin123",
    "confirmPassword": "admin123",
    "role": "admin"
  }'

# Admin Login
curl -X POST http://localhost:3000/api/auth/admin/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@test.com",
    "password": "admin123"
  }'

# Get Admin Profile (replace TOKEN with actual token)
curl -X GET http://localhost:3000/api/auth/admin/profile \
  -H "Authorization: Bearer TOKEN"

# Update Admin Profile
curl -X PUT http://localhost:3000/api/auth/admin/profile \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "phone": "1234567890",
    "bio": "I am an admin"
  }'

# Change Password
curl -X POST http://localhost:3000/api/auth/admin/change-password \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "currentPassword": "admin123",
    "newPassword": "newpassword123",
    "confirmPassword": "newpassword123"
  }'

# Get All Admins (only for super_admin)
curl -X GET http://localhost:3000/api/auth/admin/all \
  -H "Authorization: Bearer TOKEN"

# Update Admin Role
curl -X PUT http://localhost:3000/api/auth/admin/update-role/507f1f77bcf86cd799439012 \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "role": "moderator",
    "permissions": ["view_reports", "manage_content"]
  }'
```

### 2. Using Postman

1. **Create Collection**: "Admin Auth API"

2. **Create Requests**:
   - `POST` Login Admin → `/api/auth/admin/login`
   - `GET` Get Profile → `/api/auth/admin/profile` (with token)
   - `PUT` Update Profile → `/api/auth/admin/profile` (with token)
   - `POST` Change Password → `/api/auth/admin/change-password` (with token)

3. **Set Authorization**:
   - Type: Bearer Token
   - Token: Use result from login response

---

## Common Implementation Patterns

### 1. Checking Permissions in Frontend

```javascript
import { adminAuthService } from '../services/adminAuthService';

// Check if user can perform action
if (adminAuthService.hasPermission('manage_users')) {
  // Show delete button
} else {
  // Hide button
}
```

### 2. Protected API Calls

```javascript
const makeAdminRequest = async (url, options = {}) => {
  const token = localStorage.getItem('adminToken');

  if (!token) {
    throw new Error('Not authenticated');
  }

  const response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (response.status === 401) {
    // Token expired or invalid
    adminAuthService.logout();
    window.location.href = '/admin/login';
  }

  return response.json();
};
```

### 3. Admin Dashboard Layout

```jsx
function AdminDashboard() {
  const { admin, hasPermission } = useAdmin();

  return (
    <div className="admin-layout">
      <Sidebar>
        {hasPermission('manage_users') && (
          <NavLink to="/admin/users">Users</NavLink>
        )}
        {hasPermission('manage_products') && (
          <NavLink to="/admin/products">Products</NavLink>
        )}
        {hasPermission('manage_orders') && (
          <NavLink to="/admin/orders">Orders</NavLink>
        )}
        {hasPermission('view_reports') && (
          <NavLink to="/admin/reports">Reports</NavLink>
        )}
      </Sidebar>

      <MainContent>
        <Header>
          <p>
            Welcome, {admin?.firstName} {admin?.lastName}
          </p>
          <p>Role: {admin?.role}</p>
        </Header>
        <Routes>
          <Route
            path="/users"
            element={
              <ProtectedAdminRoute requiredPermission="manage_users">
                <UsersPage />
              </ProtectedAdminRoute>
            }
          />
          {/* More routes */}
        </Routes>
      </MainContent>
    </div>
  );
}
```

---

## Error Handling Examples

### 1. Frontend Error Handling

```javascript
try {
  const result = await adminAuthService.loginAdmin(email, password);

  if (!result.success) {
    // Handle specific errors
    if (result.error.includes('not found')) {
      showError('Admin account not found');
    } else if (result.error.includes('Invalid')) {
      showError('Invalid credentials');
    } else {
      showError(result.error);
    }
  }
} catch (err) {
  console.error('Unexpected error:', err);
  showError('An unexpected error occurred');
}
```

### 2. Server Error Handling

```javascript
const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  console.error(`[ERROR] ${new Date().toISOString()} - ${message}`);

  res.status(statusCode).json({
    error: message,
    statusCode: statusCode,
  });
};

module.exports = errorHandler;
```

---

**These examples provide a complete foundation for integrating admin authentication into your application!**
