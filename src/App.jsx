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
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
