const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Helper to generate JWT token using the User ID
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d', // Token valid for 30 days
  });
};

/**
 * @desc    Register new user
 * @route   POST /auth/signup
 * @access  Public
 */
const registerUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validate basic input
    if (!email || !password) {
      res.status(400);
      throw new Error('Please add all fields (email, password)');
    }

    // Check if user already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400);
      throw new Error('User already exists with this email');
    }

    // Create the user
    // The password will be hashed automatically by the Mongoose pre-save hook
    const user = await User.create({
      email,
      password,
    });

    if (user) {
      res.status(201).json({
        _id: user.id,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error('Invalid user data received');
    }
  } catch (error) {
    next(error); // Pass to global error middleware
  }
};

/**
 * @desc    Authenticate a user
 * @route   POST /auth/login
 * @access  Public
 */
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400);
      throw new Error('Please provide email and password');
    }

    // Check for user email and explicitly select the password payload
    const user = await User.findOne({ email }).select('+password');

    // Compare user and match password using model instance method
    if (user && (await user.matchPassword(password))) {
      res.status(200).json({
        _id: user.id,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(401);
      throw new Error('Invalid email or password credentials');
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerUser,
  loginUser,
};
