const Booking = require('../models/Booking');

async function checkOverlap(date, startTime, endTime, excludeBookingId = null) {
    const query = { date: new Date(date) };
    if (excludeBookingId) {
        query._id = { $ne: excludeBookingId };
    }

    const bookings = await Booking.find(query);

    for (let booking of bookings) {
        const existingStart = booking.startTime;
        const existingEnd = booking.endTime;

        if (startTime < existingEnd && endTime > existingStart) {
            return true;
        }
    }
    return false;
}

async function createBooking(userId, date, startTime, endTime) {

    if (startTime >= endTime) {
        throw new Error('Start time must be before end time');
    }

    const isOverlap = await checkOverlap(date, startTime, endTime);
    if (isOverlap) {
        throw new Error('Booking overlaps with existing booking');
    }

    const booking = await Booking.create({
        userId,
        date: new Date(date),
        startTime,
        endTime,
    });

    return booking;
}

async function getAllBookings() {
    const bookings = await Booking.find()
        .populate('userId', 'name email role')
        .sort({ date: 1, startTime: 1 });
    return bookings;
}

async function getBookingById(bookingId) {
    const booking = await Booking.findById(bookingId).populate('userId', 'name email role');
    if (!booking) {
        throw new Error('Booking not found');
    }
    return booking;
}

async function deleteBooking(bookingId) {
    const booking = await Booking.findById(bookingId);
    if (!booking) {
        throw new Error('Booking not found');
    }

    await Booking.deleteOne({ _id: bookingId });
    return booking;
}

async function getBookingsByUser(userId) {
    const bookings = await Booking.find({ userId })
        .populate('userId', 'name email role')
        .sort({ date: 1, startTime: 1 });
    return bookings;
}

module.exports = {
    checkOverlap,
    createBooking,
    getAllBookings,
    getBookingById,
    deleteBooking,
    getBookingsByUser,
};