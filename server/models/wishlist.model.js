const mongoose = require('mongoose');

const wishlistItemSchema = new mongoose.Schema({
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
  category: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
  addedAt: {
    type: Date,
    default: Date.now,
  },
});

const wishlistSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
      unique: [true, 'User can only have one wishlist'],
    },

    items: [wishlistItemSchema],

    totalItems: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

// Middleware to update totalItems count
wishlistSchema.pre('save', function (next) {
  this.totalItems = this.items.length;
  next();
});

const WISHLIST = mongoose.model('Wishlist', wishlistSchema);
module.exports = WISHLIST;
