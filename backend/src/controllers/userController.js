const {
    getAllUsers,
    getUserById,
    createUser,
    changeUserRole,
    deleteUser,
    getUserBookingCount,
} = require('../services/userService');

const { Msg, MsgError } = require('../utils/responseHelper');

const getAll = async (req, res) => {
    try {
        const users = await getAllUsers();
        Msg(res, 'Users retrieved successfully', { users }, 200);
    } catch (error) {
        MsgError(res, error.message, 500);
    }
};

const getById = async (req, res) => {
    try {
        const user = await getUserById(req.params.id);
        const bookingCount = await getUserBookingCount(req.params.id);

        Msg(res, 'User retrieved successfully', {
            user,
            bookingCount,
        }, 200);
    } catch (error) {
        MsgError(res, error.message, 404);
    }
};

const create = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        const user = await createUser(name, email, password, role);

        Msg(res, 'User created successfully', { user }, 201);
    } catch (error) {
        MsgError(res, error.message, 400);
    }
};

const changeRole = async (req, res) => {
    try {
        const { role } = req.body;

        if (!role) {
            return MsgError(res, 'Role is required', 400);
        }

        const user = await changeUserRole(req.params.id, role);

        Msg(res, 'User role updated successfully', { user }, 200);
    } catch (error) {
        MsgError(res, error.message, 400);
    }
};

const changePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const userId = req.params.id;

        // Check if user is changing their own password or is admin
        const isOwnAccount = req.user._id.toString() === userId;
        const isAdmin = req.user.role === 'admin';

        if (!isOwnAccount && !isAdmin) {
            return MsgError(res, 'You can only change your own password', 403);
        }

        if (!currentPassword || !newPassword) {
            return MsgError(res, 'Current password and new password are required', 400);
        }

        const User = require('../models/User');
        const bcrypt = require('bcryptjs');

        const user = await User.findById(userId);
        if (!user) {
            return MsgError(res, 'User not found', 404);
        }

        // If not admin, verify current password
        if (!isAdmin) {
            const isMatch = await bcrypt.compare(currentPassword, user.password);
            if (!isMatch) {
                return MsgError(res, 'Current password is incorrect', 401);
            }
        }

        // Hash new password and update
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        Msg(res, 'Password updated successfully', {}, 200);
    } catch (error) {
        MsgError(res, error.message, 400);
    }
};

const deleteById = async (req, res) => {
    try {
        const user = await deleteUser(req.params.id);

        Msg(res, 'User deleted successfully. All their bookings have been removed.', { user }, 200);
    } catch (error) {
        MsgError(res, error.message, 400);
    }
};

module.exports = {
    getAll,
    getById,
    create,
    changeRole,
    changePassword,
    deleteById,
};