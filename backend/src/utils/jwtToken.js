const jwt = require('jsonwebtoken');

const generateToken = (user) => {
    return jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET || 'your_secret_key_here',
        { expiresIn: '7d' }
    );
};

// Verify token
const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET || 'your_secret_key_here');
    } catch (error) {
        return null;
    }
};

module.exports = {
    generateToken,
    verifyToken,
};