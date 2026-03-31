# Admin Authentication - Quick Start Guide

## 🚀 5-Minute Setup

### 1. Verify Backend is Running
```bash
# Terminal 1: Start backend server
cd server
npm run dev
# Should be running at http://localhost:3000
```

### 2. Start Frontend Development
```bash
# Terminal 2: Start frontend
npm run dev
# Should open at http://localhost:5173 or similar
```

### 3. Test Admin Login
```
1. Navigate to: http://localhost:5173/admin/login
2. Use credentials:
   - Email: admin@example.com (or register new)
   - Password: admin123
3. You should see the Admin Dashboard
```

---

## 📁 Key Files Quick Reference

| File | Purpose | Location |
|------|---------|----------|
| Redux State | Admin auth state management | `src/Store/features/admin/admin.auth.slice.js` |
| API Calls | Admin API integration | `src/Store/features/admin/adminAuthAPI.js` |
| Login Page | Admin login UI | `src/pages/Admin/Auth/AdminLogin.jsx` |
| Dashboard | Main admin page | `src/pages/Admin/Dashboard.jsx` |
| Profile | Admin profile mgmt | `src/pages/Admin/Profile.jsx` |
| Layout | Admin page layout | `src/components/admin/AdminLayout.jsx` |
| Routes | App routing config | `src/App.jsx` |
| Protection | Route protection | `src/components/ProtectedAdminRoute.jsx` |

---

## 🔧 Common Tasks

### Add New Admin Route
```jsx
// In src/App.jsx, inside admin children:
{
  path: 'new-page',
  element: <NewAdminPage />,
}
```

### Add Permission Check
```jsx
// In any component:
const { permissions } = useSelector(state => state.adminAuth);
const canManageUsers = permissions.includes('manage_users');
```

### Add Sidebar Menu Item
```jsx
// In src/components/admin/AdminSidebar.jsx menuItems array:
{
  label: 'My Feature',
  href: '/admin/my-feature',
  icon: PAGE_ICONS.GRID,
  show: true,
  permission: 'required_permission', // optional
}
```

### Logout Admin
```jsx
import { logoutAdmin } from '@/Store/features/admin/admin.auth.slice';

dispatch(logoutAdmin()); // Clears token and redirects
```

### Check Admin Status
```jsx
const { admin, token, role, permissions } = useSelector(
  state => state.adminAuth
);

if (!token) {
  // Not logged in
}
```

---

## 🎨 Styling Quick Reference

### Button Colors
```jsx
// Primary admin green
className="bg-suxnix-secondary hover:bg-green-700"

// Secondary gray
className="bg-gray-100 hover:bg-gray-200"

// Danger red
className="text-red-600 hover:bg-red-50"
```

### Common Classes
```jsx
// Cards
<Card className="border-none shadow-sm">

// Sections
<section className="py-30 lg:py-32.5">

// Forms
<form className="space-y-6">

// Buttons
<Button className="rounded-full px-8 py-6">
```

---

## 📊 Redux Dispatch Examples

### Login Admin
```jsx
import { loginAdmin } from '@/Store/features/admin/admin.auth.slice';

const dispatch = useDispatch();
await dispatch(loginAdmin({ email: 'admin@test.com', password: 'pass123' }));
```

### Get Profile
```jsx
import { getAdminProfile } from '@/Store/features/admin/admin.auth.slice';

await dispatch(getAdminProfile());
```

### Update Profile
```jsx
import { updateAdminProfile } from '@/Store/features/admin/admin.auth.slice';

await dispatch(updateAdminProfile({
  firstName: 'John',
  lastName: 'Doe',
  phone: '123456789'
}));
```

### Change Password
```jsx
import { changeAdminPassword } from '@/Store/features/admin/admin.auth.slice';

await dispatch(changeAdminPassword({
  oldPassword: 'old123',
  newPassword: 'new123'
}));
```

---

## 🔐 Token Management

### Tokens Stored in localStorage
```javascript
suxnixAdminToken     // JWT token for API calls
suxnixAdminRole      // Current admin role
suxnixAdminPermissions // Array of permissions (JSON)
```

### Auto-include in API Calls
```javascript
// Private API automatically adds token to header
// See: src/Store/services/privateAPI.js

const privateAPI = axios.create({
  baseURL: API,
  // Interceptor adds: Authorization: Bearer {token}
});
```

---

## 🧪 Testing Commands

```bash
# Test admin login
curl -X POST http://localhost:3000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@test.com",
    "password": "admin123"
  }'

# Get admin profile (needs token)
curl -X GET http://localhost:3000/api/admin/profile \
  -H "Authorization: Bearer YOUR_TOKEN"

# Update profile
curl -X PUT http://localhost:3000/api/admin/profile \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe"
  }'
```

---

## 🎯 Permissions Reference

Admin system supports 6 permissions:
- `manage_users` - Can manage user accounts
- `manage_products` - Can manage product catalog
- `manage_orders` - Can manage orders
- `manage_admins` - Can manage other admins
- `view_reports` - Can access analytics/reports
- `manage_content` - Can manage website content

---

## 🚨 Troubleshooting

| Issue | Solution |
|-------|----------|
| Token not persisting | Check localStorage in DevTools |
| Can't login | Verify backend endpoint returns token |
| Protected routes redirect | Check ProtectedAdminRoute wrapper |
| Sidebar not showing | Check permissions and role in Redux |
| Styles not applying | Clear cache, rebuild with `npm run build` |

---

## 📞 Quick Links

- Backend Auth Docs: `server/AUTH_DOCUMENTATION.md`
- Frontend Implementation: `ADMIN_FRONTEND_IMPLEMENTATION.md`
- Integration Examples: `ADMIN_AUTH_INTEGRATION_EXAMPLES.md`
- System Architecture: `AUTH_SYSTEM_ARCHITECTURE.md`

---

**Status**: ✅ Ready to use
**Last Updated**: 2024
