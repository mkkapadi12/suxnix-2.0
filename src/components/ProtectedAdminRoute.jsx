import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedAdminRoute = ({
  children,
  requiredRole = null,
  requiredPermission = null,
}) => {
  const { token, role, permissions } = useSelector((state) => state.adminAuth);

  // Check if admin is authenticated
  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  // Check required role
  if (requiredRole && role !== requiredRole) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  // Check required permission
  if (requiredPermission && !permissions.includes(requiredPermission)) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return children;
};

export default ProtectedAdminRoute;
