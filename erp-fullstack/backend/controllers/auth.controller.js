const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.register = async (req, res, next) => {
  try {
    const { username, password, name } = req.body;
    const existing = await User.findOne({ username });
    if (existing) return res.status(400).json({ success:false, message: 'Username already exists' });
    const user = new User({ username, password, name });
    await user.save();
    res.json({ success:true, message:'Registered successfully' });
  } catch (err) { next(err); }
};

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ success:false, message: 'Invalid credentials' });
    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ success:false, message: 'Invalid credentials' });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });
    res.json({ success:true, token, user: { id: user._id, username: user.username, name: user.name } });
  } catch (err) { next(err); }
};
