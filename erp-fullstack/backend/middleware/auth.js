const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const User = require('../models/User');

module.exports = async function (req, res, next) {
  try {
    const header = req.headers['authorization'];
    if (!header) throw createError(401, 'Missing Authorization header');
    const token = header.split(' ')[1];
    if (!token) throw createError(401, 'Invalid Authorization header');
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(payload.id).select('-password');
    if (!user) throw createError(401, 'User not found');
    req.user = user;
    next();
  } catch (err) {
    next(createError(401, err.message || 'Unauthorized'));
  }
};
