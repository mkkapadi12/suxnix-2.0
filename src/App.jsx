import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Error from './pages/Error';
import Layout from './components/layout/Layout';
import Register from './pages/Customer/Auth/Register';
import Login from './pages/Customer/Auth/Login';
import Contact from './pages/Contact';
import Account from './pages/Customer/Profile/Account';
import Addresses from './pages/Customer/Addresses/Addresses';
import Settings from './pages/Customer/Settings/Settings';

// Admin imports
import AdminLayout from './components/admin/AdminLayout';
import AdminLogin from './pages/Admin/Auth/AdminLogin';
import AdminRegister from './pages/Admin/Auth/AdminRegister';
import AdminDashboard from './pages/Admin/Dashboard';
import AdminProfile from './pages/Admin/AdminProfile';
import ProtectedAdminRoute from './components/ProtectedAdminRoute';
import AdminUsers from './pages/Admin/AdminUsers';
import AdminProducts from './pages/Admin/products/AdminProducts';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />, // ✅ Wrap routes with layout
    errorElement: <Error />,
    children: [
      {
        index: true, // "/" route
        element: <Home />,
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'contact',
        element: <Contact />,
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'account',
        element: <Account />,
      },
      {
        path: 'account/settings',
        element: <Settings />,
      },
      {
        path: 'addresses',
        element: <Addresses />,
      },
      {
        path: 'settings',
        element: <Settings />,
      },
    ],
  },

  // Admin routes
  {
    path: '/admin/login',
    element: <AdminLogin />,
    errorElement: <Error />,
  },
  {
    path: '/admin/register',
    element: <AdminRegister />,
    errorElement: <Error />,
  },
  {
    path: '/admin',
    element: (
      <ProtectedAdminRoute>
        <AdminLayout />
      </ProtectedAdminRoute>
    ),
    errorElement: <Error />,
    children: [
      {
        path: 'dashboard',
        element: <AdminDashboard />,
      },
      {
        path: 'profile',
        element: <AdminProfile />,
      },
      // Add more admin routes here as needed
      {
        path: 'users',
        element: <AdminUsers />,
      },
      {
        path: 'products',
        element: <AdminProducts />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
