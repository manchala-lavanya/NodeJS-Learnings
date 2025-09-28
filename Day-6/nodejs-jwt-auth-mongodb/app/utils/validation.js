const { body } = require("express-validator");
const { user } = require("../models");

// Check if username already exists (case insensitive)
const checkDuplicateUserName = async (userName) => {
  const existingUserName = await user.findOne({ userName: { $regex: new RegExp(`^${userName}$`, 'i') } });
  if (existingUserName) {
    throw new Error('Username already exists.');
  }
  return true;
}

// Check if email already exists
const checkDuplicateEmail = async (email) => {
  const existingEmail = await user.findOne({ email: email });
  if (existingEmail) {
    throw new Error('Email already exists.');
  }
  return true;
}

// For signup, username, email and password are required.
exports.userNameEmailValidator = [
  body('username')
    .trim()
    .notEmpty()
    .withMessage('Username cannot be empty')
    .bail()
    .custom(checkDuplicateUserName),

  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email cannot be empty')
    .bail()
    .isEmail()
    .withMessage('Invalid email format')
    .bail()
    .custom(checkDuplicateEmail),

  body('password')
    .trim()
    .notEmpty()
    .withMessage('Password cannot be empty'),

  body('roles')
    .isArray({ min: 1 })
    .withMessage('Roles must be an array with at least one role')
];

// For signin, only username and password are required.
exports.userNamePasswordValidator = [
  body('username')
    .trim()
    .notEmpty()
    .withMessage('Username cannot be empty'),

  body('password')
    .trim()
    .notEmpty()
    .withMessage('Password cannot be empty')
];
