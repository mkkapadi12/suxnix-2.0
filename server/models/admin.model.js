const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const adminSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'First name is required'],
      trim: true,
    },

    lastName: {
      type: String,
      required: [true, 'Last name is required'],
      trim: true,
    },

    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: [true, 'Email already exists'],
      lowercase: true,
    },

    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters'],
    },

    confirmPassword: {
      type: String,
      required: [true, 'Password confirmation is required'],
      minlength: [6, 'Password must be at least 6 characters'],
    },

    profilePicture: {
      type: String,
      default: '',
    },

    phone: {
      type: Number,
      default: '',
      trim: true,
    },

    gender: {
      type: String,
      enum: ['Male', 'Female', 'Other', ''],
      default: '',
    },

    dateOfBirth: {
      type: Date,
      default: null,
    },

    bio: {
      type: String,
      default: '',
      trim: true,
      maxlength: [500, 'Bio cannot exceed 500 characters'],
    },

    // Admin-specific fields
    role: {
      type: String,
      enum: ['super_admin', 'admin', 'moderator'],
      default: 'admin',
      required: true,
    },

    permissions: [
      {
        type: String,
        enum: [
          'manage_users',
          'manage_products',
          'manage_orders',
          'manage_admins',
          'view_reports',
          'manage_content',
        ],
      },
    ],

    isActive: {
      type: Boolean,
      default: true,
    },

    lastLogin: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true },
);

// Secure the password with bcrypt
adminSchema.pre('save', async function () {
  if (!this.isModified('password')) return;

  const saltRound = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, saltRound);
});

// Generate JWT token
adminSchema.methods.generateToken = async function () {
  try {
    const token = jwt.sign(
      {
        adminId: this._id.toString(),
        email: this.email,
        firstName: this.firstName,
        lastName: this.lastName,
        role: this.role,
        permissions: this.permissions,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: '24h',
      },
    );
    return token;
  } catch (error) {
    console.error('Error generating token:', error);
    throw new Error('Failed to generate token');
  }
};

// Compare password
adminSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// Check if admin has specific permission
adminSchema.methods.hasPermission = function (permission) {
  return this.permissions.includes(permission);
};

const ADMIN = mongoose.model('Admin', adminSchema);
module.exports = ADMIN;
