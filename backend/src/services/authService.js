const User = require('../models/User');
const bcrypt = require('bcryptjs');

async function registerUser(name, email, password) {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new Error('Email already registered');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        role: 'user',
    });

    return user;
}

async function loginUser(email, password) {

    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('Invalid email or password');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Invalid email or password');
    }

    return user;
}

async function findUserById(userId) {
    const user = await User.findById(userId);
    if (!user) {
        throw new Error('User not found');
    }
    return user;
}

module.exports = {
    registerUser,
    loginUser,
    findUserById,
};