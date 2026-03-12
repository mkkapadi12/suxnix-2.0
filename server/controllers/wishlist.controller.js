const WISHLIST = require('../models/wishlist.model');

// Get wishlist for a user
const getWishlist = async (req, res, next) => {
  try {
    const userId = req.user._id;

    let wishlist = await WISHLIST.findOne({ userId });

    if (!wishlist) {
      wishlist = new WISHLIST({
        userId,
        items: [],
      });
      await wishlist.save();
    }

    return res.status(200).json({
      msg: 'Wishlist retrieved successfully!',
      wishlist,
    });
  } catch (error) {
    return next(error);
  }
};

// Add item to wishlist
const addToWishlist = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { productId, productName, productImage, price, category, description } = req.body;

    if (!productId || !productName || price === undefined) {
      return res.status(400).json({
        msg: 'Product ID, name, and price are required',
      });
    }

    let wishlist = await WISHLIST.findOne({ userId });

    if (!wishlist) {
      wishlist = new WISHLIST({
        userId,
        items: [],
      });
    }

    // Check if product already exists in wishlist
    const existingItem = wishlist.items.find((item) => item.productId === productId);

    if (existingItem) {
      return res.status(400).json({
        msg: 'Product already exists in wishlist',
      });
    }

    wishlist.items.push({
      productId,
      productName,
      productImage: productImage || '',
      price,
      category: category || '',
      description: description || '',
    });

    const updatedWishlist = await wishlist.save();

    return res.status(201).json({
      msg: 'Item added to wishlist successfully!',
      wishlist: updatedWishlist,
    });
  } catch (error) {
    return next(error);
  }
};

// Remove item from wishlist
const removeFromWishlist = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { productId } = req.params;

    const wishlist = await WISHLIST.findOne({ userId });

    if (!wishlist) {
      return res.status(404).json({
        msg: 'Wishlist not found',
      });
    }

    const itemIndex = wishlist.items.findIndex((item) => item.productId === productId);

    if (itemIndex === -1) {
      return res.status(404).json({
        msg: 'Product not found in wishlist',
      });
    }

    wishlist.items.splice(itemIndex, 1);
    const updatedWishlist = await wishlist.save();

    return res.status(200).json({
      msg: 'Item removed from wishlist successfully!',
      wishlist: updatedWishlist,
    });
  } catch (error) {
    return next(error);
  }
};

// Clear entire wishlist
const clearWishlist = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const wishlist = await WISHLIST.findOne({ userId });

    if (!wishlist) {
      return res.status(404).json({
        msg: 'Wishlist not found',
      });
    }

    wishlist.items = [];
    const updatedWishlist = await wishlist.save();

    return res.status(200).json({
      msg: 'Wishlist cleared successfully!',
      wishlist: updatedWishlist,
    });
  } catch (error) {
    return next(error);
  }
};

// Check if product is in wishlist
const isInWishlist = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { productId } = req.params;

    const wishlist = await WISHLIST.findOne({ userId });

    if (!wishlist) {
      return res.status(200).json({
        isInWishlist: false,
      });
    }

    const isInWishlist = wishlist.items.some((item) => item.productId === productId);

    return res.status(200).json({
      isInWishlist,
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  clearWishlist,
  isInWishlist,
};
