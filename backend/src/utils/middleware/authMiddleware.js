const jwt = require('jsonwebtoken');
const User = require('../../models/User');

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key_here';

// Protect routes - verify token and get user from database
const protect = async (req, res, next) => {
    let token = req.cookies?.token || req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Not authorized, no token' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);

        // Get user from database (exclude password)
        const user = await User.findById(decoded.id).select('-password');

        if (!user) {
            return res.status(401).json({ message: 'Not authorized, user not found' });
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Not authorized, token failed' });
    }
};

// Admin only middleware
const admin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ message: 'Not authorized as an admin' });
    }
};

// Owner or Admin only middleware
const ownerOrAdmin = (req, res, next) => {
    if (req.user && (req.user.role === 'owner' || req.user.role === 'admin')) {
        next();
    } else {
        res.status(403).json({ message: 'Not authorized as an owner or admin' });
    }
};

module.exports = {
    protect,
    admin,
    ownerOrAdmin,
};