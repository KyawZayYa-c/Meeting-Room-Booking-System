const { registerUser, loginUser } = require('../services/authService');
const { generateToken } = require('../utils/jwtToken');
const { Msg, MsgError } = require('../utils/responseHelper');
const { DTime } = require('../utils/errorHelper');

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const user = await registerUser(name, email, password);

        const token = generateToken(user);

        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        Msg(res, 'User registered successfully', {
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
            token,
        }, 201);
    } catch (error) {
        MsgError(res, error.message, 400);
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await loginUser(email, password);

        // Generate JWT token
        const token = generateToken(user);

        // Set cookie
        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        Msg(res, 'Login successful', {
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
            token,
        }, 200);
    } catch (error) {
        MsgError(res, error.message, 401);
    }
};

const logout = async (req, res) => {
    res.cookie('token', '', {
        httpOnly: true,
        expires: new Date(0),
    });
    Msg(res, 'Logged out successfully', {}, 200);
};

const getMe = async (req, res) => {
    try {
        Msg(res, 'User profile retrieved', {
            user: {
                id: req.user._id,
                name: req.user.name,
                email: req.user.email,
                role: req.user.role,
            },
        }, 200);
    } catch (error) {
        MsgError(res, error.message, 500);
    }
};

module.exports = {
    register,
    login,
    logout,
    getMe,
};