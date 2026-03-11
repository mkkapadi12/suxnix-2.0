const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
    },

    type: {
      type: String,
      enum: ['Home', 'Office', 'Other'],
      default: 'Home',
    },

    fullName: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
    },

    phoneNumber: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
    },

    addressLine1: {
      type: String,
      required: [true, 'Address line 1 is required'],
      trim: true,
    },

    addressLine2: {
      type: String,
      default: '',
      trim: true,
    },

    city: {
      type: String,
      required: [true, 'City is required'],
      trim: true,
    },

    state: {
      type: String,
      required: [true, 'State is required'],
      trim: true,
    },

    zipCode: {
      type: String,
      required: [true, 'Zip code is required'],
      trim: true,
    },

    country: {
      type: String,
      required: [true, 'Country is required'],
      trim: true,
    },

    isDefault: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

const ADDRESS = mongoose.model('Address', addressSchema);
module.exports = ADDRESS;
