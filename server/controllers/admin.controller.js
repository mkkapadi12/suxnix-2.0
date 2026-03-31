const ADMIN = require('../models/admin.model');

// Register admin (only by super_admin or during initial setup)
const registerAdmin = async (req, res, next) => {
  try {
    const admin = req.body;

    // Validate required fields
    if (!admin.firstName || !admin.lastName || !admin.email || !admin.password) {
      const error = new Error('Missing required fields');
      error.statusCode = 400;
      return next(error);
    }

    // Check if admin already exists
    const existingAdmin = await ADMIN.findOne({ email: admin.email });
    if (existingAdmin) {
      const error = new Error('Admin with this email already exists');
      error.statusCode = 409;
      return next(error);
    }

    // Set default role if not provided
    if (!admin.role) {
      admin.role = 'admin';
    }

    // Set default permissions based on role
    if (!admin.permissions || admin.permissions.length === 0) {
      if (admin.role === 'super_admin') {
        admin.permissions = [
          'manage_users',
          'manage_products',
          'manage_orders',
          'manage_admins',
          'view_reports',
          'manage_content',
        ];
      } else if (admin.role === 'admin') {
        admin.permissions = [
          'manage_users',
          'manage_products',
          'manage_orders',
          'view_reports',
          'manage_content',
        ];
      } else if (admin.role === 'moderator') {
        admin.permissions = ['view_reports', 'manage_content'];
      }
    }

    const newAdmin = await ADMIN.create(admin);

    return res.status(201).json({
      msg: 'Admin registration successful!',
      token: await newAdmin.generateToken(),
      adminId: newAdmin._id.toString(),
      role: newAdmin.role,
    });
  } catch (error) {
    return next(error);
  }
};

// Login admin
const loginAdmin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      const error = new Error('Email and password are required');
      error.statusCode = 400;
      return next(error);
    }

    const admin = await ADMIN.findOne({ email });

    if (!admin) {
      const error = new Error('Admin not found');
      error.statusCode = 404;
      return next(error);
    }

    if (!admin.isActive) {
      const error = new Error('Admin account is inactive');
      error.statusCode = 403;
      return next(error);
    }

    const isMatch = await admin.comparePassword(password);

    if (!isMatch) {
      const error = new Error('Invalid credentials');
      error.statusCode = 401;
      return next(error);
    }

    // Update last login
    admin.lastLogin = new Date();
    await admin.save();

    return res.status(200).json({
      msg: 'Admin login successful!',
      token: await admin.generateToken(),
      adminId: admin._id.toString(),
      role: admin.role,
      permissions: admin.permissions,
    });
  } catch (error) {
    return next(error);
  }
};

// Get admin profile
const getAdminProfile = async (req, res, next) => {
  try {
    const admin = req.admin;

    return res.status(200).json({
      msg: 'Admin profile retrieved successfully!',
      admin,
    });
  } catch (error) {
    return next(error);
  }
};

// Update admin profile
const updateAdminProfile = async (req, res, next) => {
  try {
    const adminId = req.admin._id;
    const {
      firstName,
      lastName,
      phone,
      gender,
      dateOfBirth,
      bio,
      profilePicture,
    } = req.body;

    const updateData = {};

    if (firstName !== undefined) updateData.firstName = firstName;
    if (lastName !== undefined) updateData.lastName = lastName;
    if (phone !== undefined) updateData.phone = phone;
    if (gender !== undefined) updateData.gender = gender;
    if (dateOfBirth !== undefined) updateData.dateOfBirth = dateOfBirth;
    if (bio !== undefined) updateData.bio = bio;
    if (profilePicture !== undefined) updateData.profilePicture = profilePicture;

    const updatedAdmin = await ADMIN.findByIdAndUpdate(adminId, updateData, {
      runValidators: true,
      returnDocument: 'after',
    }).select('-password -confirmPassword');

    return res.status(200).json({
      msg: 'Admin profile updated successfully!',
      admin: updatedAdmin,
    });
  } catch (error) {
    return next(error);
  }
};

// Change admin password
const changePassword = async (req, res, next) => {
  try {
    const adminId = req.admin._id;
    const { currentPassword, newPassword, confirmPassword } = req.body;

    if (!currentPassword || !newPassword || !confirmPassword) {
      const error = new Error('All password fields are required');
      error.statusCode = 400;
      return next(error);
    }

    if (newPassword !== confirmPassword) {
      const error = new Error('New passwords do not match');
      error.statusCode = 400;
      return next(error);
    }

    if (newPassword.length < 6) {
      const error = new Error('New password must be at least 6 characters');
      error.statusCode = 400;
      return next(error);
    }

    const admin = await ADMIN.findById(adminId);
    const isMatch = await admin.comparePassword(currentPassword);

    if (!isMatch) {
      const error = new Error('Current password is incorrect');
      error.statusCode = 401;
      return next(error);
    }

    admin.password = newPassword;
    admin.confirmPassword = confirmPassword;
    await admin.save();

    return res.status(200).json({
      msg: 'Password changed successfully!',
    });
  } catch (error) {
    return next(error);
  }
};

// Deactivate admin account
const deactivateAdmin = async (req, res, next) => {
  try {
    const adminId = req.admin._id;

    const updatedAdmin = await ADMIN.findByIdAndUpdate(
      adminId,
      { isActive: false },
      { returnDocument: 'after' },
    ).select('-password -confirmPassword');

    return res.status(200).json({
      msg: 'Admin account deactivated successfully!',
      admin: updatedAdmin,
    });
  } catch (error) {
    return next(error);
  }
};

// Get all admins (super_admin only)
const getAllAdmins = async (req, res, next) => {
  try {
    const admins = await ADMIN.find().select('-password -confirmPassword');

    return res.status(200).json({
      msg: 'Admins retrieved successfully!',
      count: admins.length,
      admins,
    });
  } catch (error) {
    return next(error);
  }
};

// Update admin role and permissions (super_admin only)
const updateAdminRoleAndPermissions = async (req, res, next) => {
  try {
    const { adminId } = req.params;
    const { role, permissions } = req.body;

    if (!role) {
      const error = new Error('Role is required');
      error.statusCode = 400;
      return next(error);
    }

    if (!['super_admin', 'admin', 'moderator'].includes(role)) {
      const error = new Error('Invalid role');
      error.statusCode = 400;
      return next(error);
    }

    const updateData = { role };

    if (permissions && Array.isArray(permissions)) {
      updateData.permissions = permissions;
    }

    const updatedAdmin = await ADMIN.findByIdAndUpdate(adminId, updateData, {
      runValidators: true,
      returnDocument: 'after',
    }).select('-password -confirmPassword');

    if (!updatedAdmin) {
      const error = new Error('Admin not found');
      error.statusCode = 404;
      return next(error);
    }

    return res.status(200).json({
      msg: 'Admin role and permissions updated successfully!',
      admin: updatedAdmin,
    });
  } catch (error) {
    return next(error);
  }
};

// Deactivate admin (super_admin only)
const deactivateAdminAccount = async (req, res, next) => {
  try {
    const { adminId } = req.params;

    const updatedAdmin = await ADMIN.findByIdAndUpdate(
      adminId,
      { isActive: false },
      { returnDocument: 'after' },
    ).select('-password -confirmPassword');

    if (!updatedAdmin) {
      const error = new Error('Admin not found');
      error.statusCode = 404;
      return next(error);
    }

    return res.status(200).json({
      msg: 'Admin account deactivated successfully!',
      admin: updatedAdmin,
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  registerAdmin,
  loginAdmin,
  getAdminProfile,
  updateAdminProfile,
  changePassword,
  deactivateAdmin,
  getAllAdmins,
  updateAdminRoleAndPermissions,
  deactivateAdminAccount,
};
