const ADDRESS = require('../models/address.model');
const USER = require('../models/user.model');

// Get all addresses for a user
const getAllAddresses = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const addresses = await ADDRESS.find({ userId }).sort({
      isDefault: -1,
      createdAt: -1,
    });

    return res.status(200).json({
      msg: 'Addresses retrieved successfully!',
      addresses,
    });
  } catch (error) {
    return next(error);
  }
};

// Create a new address
const createAddress = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const {
      type,
      fullName,
      phoneNumber,
      addressLine1,
      addressLine2,
      city,
      state,
      zipCode,
      country,
      isDefault,
    } = req.body;

    // If this is set as default, unset all other defaults for this user
    if (isDefault) {
      await ADDRESS.updateMany({ userId }, { isDefault: false });
    }

    const newAddress = await ADDRESS.create({
      userId,
      type,
      fullName,
      phoneNumber,
      addressLine1,
      addressLine2,
      city,
      state,
      zipCode,
      country,
      isDefault,
    });

    // Add address to user's addresses array
    await USER.findByIdAndUpdate(userId, {
      $push: { addresses: newAddress._id },
      returnDocument: 'after',
    });

    return res.status(201).json({
      msg: 'Address created successfully!',
      address: newAddress,
    });
  } catch (error) {
    return next(error);
  }
};

// Update an address
const updateAddress = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;
    const {
      type,
      fullName,
      phoneNumber,
      addressLine1,
      addressLine2,
      city,
      state,
      zipCode,
      country,
      isDefault,
    } = req.body;

    // Verify address belongs to user
    const address = await ADDRESS.findOne({ _id: id, userId });
    if (!address) {
      const error = new Error('Address not found');
      error.statusCode = 404;
      return next(error);
    }

    // If this is set as default, unset all other defaults for this user
    if (isDefault) {
      await ADDRESS.updateMany(
        { userId, _id: { $ne: id } },
        { isDefault: false },
      );
    }

    const updatedAddress = await ADDRESS.findByIdAndUpdate(
      id,
      {
        type,
        fullName,
        phoneNumber,
        addressLine1,
        addressLine2,
        city,
        state,
        zipCode,
        country,
        isDefault,
      },
      { runValidators: true, returnDocument: 'after' },
    );

    return res.status(200).json({
      msg: 'Address updated successfully!',
      address: updatedAddress,
    });
  } catch (error) {
    return next(error);
  }
};

// Delete an address
const deleteAddress = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    // Verify address belongs to user
    const address = await ADDRESS.findOne({ _id: id, userId });
    if (!address) {
      const error = new Error('Address not found');
      error.statusCode = 404;
      return next(error);
    }

    await ADDRESS.findByIdAndDelete(id);

    // Remove address from user's addresses array
    await USER.findByIdAndUpdate(userId, {
      $pull: { addresses: id },
    });

    return res.status(200).json({
      msg: 'Address deleted successfully!',
    });
  } catch (error) {
    return next(error);
  }
};

// Set default address
const setDefaultAddress = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    // Verify address belongs to user
    const address = await ADDRESS.findOne({ _id: id, userId });
    if (!address) {
      const error = new Error('Address not found');
      error.statusCode = 404;
      return next(error);
    }

    // Unset all other defaults for this user
    await ADDRESS.updateMany(
      { userId, _id: { $ne: id } },
      { isDefault: false },
    );

    // Set this address as default
    const updatedAddress = await ADDRESS.findByIdAndUpdate(
      id,
      { isDefault: true },
      { new: true },
    );

    return res.status(200).json({
      msg: 'Default address set successfully!',
      address: updatedAddress,
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getAllAddresses,
  createAddress,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
};
