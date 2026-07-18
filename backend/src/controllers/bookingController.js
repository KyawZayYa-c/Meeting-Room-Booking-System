const {
    createBooking,
    getAllBookings,
    getBookingById,
    deleteBooking,
    getBookingsByUser,
} = require('../services/bookingService');

const { canDeleteBooking } = require('../services/permissionService');
const { Msg, MsgError } = require('../utils/responseHelper');

const create = async (req, res) => {
    try {
        const { date, startTime, endTime } = req.body;

        if (!date || !startTime || !endTime) {
            return MsgError(res, 'Date, startTime, and endTime are required', 400);
        }

        const booking = await createBooking(req.user._id, date, startTime, endTime);

        Msg(res, 'Booking created successfully', { booking }, 201);
    } catch (error) {
        MsgError(res, error.message, 400);
    }
};

const getAll = async (req, res) => {
    try {
        const bookings = await getAllBookings();
        Msg(res, 'Bookings retrieved successfully', { bookings }, 200);
    } catch (error) {
        MsgError(res, error.message, 500);
    }
};

const getById = async (req, res) => {
    try {
        const booking = await getBookingById(req.params.id);
        Msg(res, 'Booking retrieved successfully', { booking }, 200);
    } catch (error) {
        MsgError(res, error.message, 404);
    }
};

const deleteById = async (req, res) => {
    try {
        const booking = await getBookingById(req.params.id);

        if (!canDeleteBooking(req.user, booking)) {
            return MsgError(res, 'You can only delete your own bookings', 403);
        }

        await deleteBooking(req.params.id);

        Msg(res, 'Booking deleted successfully', { booking }, 200);
    } catch (error) {
        MsgError(res, error.message, 400);
    }
};

const getByUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const bookings = await getBookingsByUser(userId);
        Msg(res, 'Bookings retrieved successfully', { bookings }, 200);
    } catch (error) {
        MsgError(res, error.message, 500);
    }
};

module.exports = {
    create,
    getAll,
    getById,
    deleteById,
    getByUser,
};