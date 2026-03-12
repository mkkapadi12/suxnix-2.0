const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: [true, 'Product ID is required'],
  },
  productName: {
    type: String,
    required: [true, 'Product name is required'],
  },
  productImage: {
    type: String,
    default: '',
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative'],
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
    min: [1, 'Quantity must be at least 1'],
  },
  subtotal: {
    type: Number,
    required: [true, 'Subtotal is required'],
  },
});

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
    },

    orderNumber: {
      type: String,
      unique: true,
      required: [true, 'Order number is required'],
    },

    items: [orderItemSchema],

    shippingAddress: {
      fullName: {
        type: String,
        required: [true, 'Full name is required'],
      },
      phoneNumber: {
        type: String,
        required: [true, 'Phone number is required'],
      },
      addressLine1: {
        type: String,
        required: [true, 'Address line 1 is required'],
      },
      addressLine2: {
        type: String,
        default: '',
      },
      city: {
        type: String,
        required: [true, 'City is required'],
      },
      state: {
        type: String,
        required: [true, 'State is required'],
      },
      postalCode: {
        type: String,
        required: [true, 'Postal code is required'],
      },
      country: {
        type: String,
        required: [true, 'Country is required'],
      },
    },

    paymentMethod: {
      type: String,
      enum: ['Credit Card', 'Debit Card', 'PayPal', 'UPI', 'Net Banking'],
      default: 'Credit Card',
    },

    subtotal: {
      type: Number,
      required: [true, 'Subtotal is required'],
      min: [0, 'Subtotal cannot be negative'],
    },

    tax: {
      type: Number,
      default: 0,
      min: [0, 'Tax cannot be negative'],
    },

    shippingCost: {
      type: Number,
      default: 0,
      min: [0, 'Shipping cost cannot be negative'],
    },

    totalAmount: {
      type: Number,
      required: [true, 'Total amount is required'],
      min: [0, 'Total amount cannot be negative'],
    },

    status: {
      type: String,
      enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled', 'Returned'],
      default: 'Pending',
    },

    trackingNumber: {
      type: String,
      default: '',
    },

    notes: {
      type: String,
      default: '',
    },

    cancellationReason: {
      type: String,
      default: '',
    },
  },
  { timestamps: true },
);

const ORDER = mongoose.model('Order', orderSchema);
module.exports = ORDER;
