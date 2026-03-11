const USER = require('../models/user.model');

const registerUser = async (req, res, next) => {
  try {
    const user = req.body;

    const newUser = await USER.create(user);

    return res.status(201).json({
      msg: 'Registration successfully!',
      token: await newUser.generateToken(),
      userId: newUser._id.toString(),
    });
  } catch (error) {
    return next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await USER.findOne({ email });

    if (!user) {
      const error = new Error('User not found');
      error.statusCode = 404;
      return next(error);
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      const error = new Error('Invalid credentials');
      error.statusCode = 401;
      return next(error);
    }

    return res.status(200).json({
      msg: 'Login successful!',
      token: await user.generateToken(),
      userId: user._id.toString(),
    });
  } catch (error) {
    return next(error);
  }
};

const profile = async (req, res, next) => {
  try {
    const user = req.user;
    return res.status(200).json({
      msg: 'Profile retrieved successfully!',
      user,
    });
  } catch (error) {
    return next(error);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { firstName, lastName, phone, gender, dateOfBirth, bio, profilePicture } = req.body;

    const updateData = {};

    if (firstName !== undefined) updateData.firstName = firstName;
    if (lastName !== undefined) updateData.lastName = lastName;
    if (phone !== undefined) updateData.phone = phone;
    if (gender !== undefined) updateData.gender = gender;
    if (dateOfBirth !== undefined) updateData.dateOfBirth = dateOfBirth;
    if (bio !== undefined) updateData.bio = bio;
    if (profilePicture !== undefined) updateData.profilePicture = profilePicture;

    const updatedUser = await USER.findByIdAndUpdate(userId, updateData, {
      new: true,
      runValidators: true,
    }).select('-password -confirmPassword');

    return res.status(200).json({
      msg: 'Profile updated successfully!',
      user: updatedUser,
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = { registerUser, loginUser, profile, updateProfile };
