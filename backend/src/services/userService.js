const User = require('../models/User');
const Booking = require('../models/Booking');
const bcrypt = require('bcryptjs');

async function getAllUsers() {
    const users = await User.find().select('-password');
    return users;
}

async function getUserById(userId) {
    const user = await User.findById(userId).select('-password');
    if (!user) {
        throw new Error('User not found');
    }
    return user;
}

async function createUser(name, email, password, role) {

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new Error('Email already user');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        role: role || 'user',
    });

    return user;
}

async function changeUserRole(userId, newRole) {
    const validRoles = ['admin', 'owner', 'user'];
    if (!validRoles.includes(newRole)) {
        throw new Error('Invalid role. Must be admin, owner, or user');
    }

    const user = await User.findById(userId);
    if (!user) {
        throw new Error('User not found');
    }

    if (user.role === 'admin' && user._id.toString() === userId) {
      throw new Error('Cannot change your own role');
    }

    user.role = newRole;
    await user.save();
    return user;
}

async function deleteUser(userId) {
    const user = await User.findById(userId);
    if (!user) {
        throw new Error('User not found');
    }

    if (user.role === 'admin') {
        throw new Error('Cannot delete admin user');
    }

    await Booking.deleteMany({ userId });

    await User.deleteOne({ _id: userId });

    return user;
}

async function getUserBookingCount(userId) {
    const count = await Booking.countDocuments({ userId });
    return count;
}

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    changeUserRole,
    deleteUser,
    getUserBookingCount,
};