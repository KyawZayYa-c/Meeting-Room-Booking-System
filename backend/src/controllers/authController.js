const {  loginUser } = require('../services/authService');
const { generateToken } = require('../utils/jwtToken');
const { Msg, MsgError } = require('../utils/responseHelper');
const { DTime } = require('../utils/errorHelper');

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await loginUser(email, password);

        // Generate JWT token
        const token = generateToken(user);

        // Set cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 3600000
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
        secure: true,
        sameSite: 'none',
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
                createdAt: req.user.createdAt,
            },
        }, 200);
    } catch (error) {
        MsgError(res, error.message, 500);
    }
};

module.exports = {
    login,
    logout,
    getMe,
};