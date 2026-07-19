const User = require('../models/User');
const bcrypt = require('bcryptjs');


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
    loginUser,
    findUserById,
};