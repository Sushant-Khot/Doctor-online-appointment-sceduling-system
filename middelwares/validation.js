const { check, validationResult } = require('express-validator');

// Register validation middleware
const registerValidation = [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password must be 6 or more characters').isLength({ min: 6 }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

// Login validation middleware
const loginValidation = [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = {
  registerValidation,
  loginValidation,
};
