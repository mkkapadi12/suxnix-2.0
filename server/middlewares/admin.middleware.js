const jwt = require('jsonwebtoken');
const ADMIN = require('../models/admin.model');

// Main admin authentication middleware
const adminAuthMiddleware = async (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    const error = new Error('Unauthorized HTTP, Token not provided !');
    error.statusCode = 401;
    return next(error);
  }

  const jwtToken = token.replace('Bearer', '').trim();

  try {
    const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);

    const adminData = await ADMIN.findOne({ email: isVerified.email }).select({
      password: 0,
      confirmPassword: 0,
    });

    if (!adminData) {
      const error = new Error('Admin not found');
      error.statusCode = 404;
      return next(error);
    }

    if (!adminData.isActive) {
      const error = new Error('Admin account is inactive');
      error.statusCode = 403;
      return next(error);
    }

    req.admin = adminData;
    req.token = token;
    req.adminId = adminData._id;
    next();
  } catch (error) {
    const errorObj = new Error('Unauthorized ! Invalid Token');
    errorObj.statusCode = 401;
    return next(errorObj);
  }
};

// Middleware to check specific permissions
const requirePermission = (requiredPermission) => {
  return async (req, res, next) => {
    try {
      if (!req.admin) {
        const error = new Error('Admin not authenticated');
        error.statusCode = 401;
        return next(error);
      }

      if (!req.admin.hasPermission(requiredPermission)) {
        const error = new Error(
          `Permission denied. Required permission: ${requiredPermission}`,
        );
        error.statusCode = 403;
        return next(error);
      }

      next();
    } catch (error) {
      const errorObj = new Error('Permission check failed');
      errorObj.statusCode = 500;
      return next(errorObj);
    }
  };
};

// Middleware to check admin role
const requireRole = (requiredRole) => {
  return async (req, res, next) => {
    try {
      if (!req.admin) {
        const error = new Error('Admin not authenticated');
        error.statusCode = 401;
        return next(error);
      }

      // super_admin has access to everything
      if (req.admin.role === 'super_admin') {
        return next();
      }

      if (requiredRole === 'admin' && req.admin.role !== 'admin') {
        const error = new Error('Admin role required');
        error.statusCode = 403;
        return next(error);
      }

      if (requiredRole === 'moderator' && !['admin', 'moderator'].includes(req.admin.role)) {
        const error = new Error('Moderator or higher role required');
        error.statusCode = 403;
        return next(error);
      }

      next();
    } catch (error) {
      const errorObj = new Error('Role check failed');
      errorObj.statusCode = 500;
      return next(errorObj);
    }
  };
};

module.exports = {
  adminAuthMiddleware,
  requirePermission,
  requireRole,
};
