import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Protect routes - verify token
export const protect = async (req, res, next) => {
  let token;

  // Read JWT from the 'jwt' cookie
  token = req.cookies.jwt;

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.userId).select('-password');

    next();
  } catch (error) {
    res.status(401).json({ message: 'Not authorized, token failed' });
  }
};

// Admin middleware
export const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(401).json({ message: 'Not authorized as an admin' });
  }
};

// Seller middleware
export const seller = (req, res, next) => {
  if (req.user && (req.user.role === 'seller' || req.user.role === 'admin')) {
    next();
  } else {
    res.status(401).json({ message: 'Not authorized as a seller' });
  }
};

// Broker middleware
export const broker = (req, res, next) => {
  if (req.user && (req.user.role === 'broker' || req.user.role === 'admin')) {
    next();
  } else {
    res.status(401).json({ message: 'Not authorized as a broker' });
  }
};