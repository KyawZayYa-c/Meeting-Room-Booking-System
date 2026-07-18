const Booking = require('../models/Booking');
const User = require('../models/User');

async function getBookingsGroupedByUser() {
    const result = await Booking.aggregate([
        {
            $group: {
                _id: '$userId',
                bookings: { $push: '$$ROOT' },
                totalBookings: { $sum: 1 },
            },
        },
        {
            $lookup: {
                from: 'users',
                localField: '_id',
                foreignField: '_id',
                as: 'userDetails',
            },
        },
        {
            $unwind: '$userDetails',
        },
        {
            $project: {
                userId: '$_id',
                userName: '$userDetails.name',
                userRole: '$userDetails.role',
                totalBookings: 1,
                bookings: {
                    date: 1,
                    startTime: 1,
                    endTime: 1,
                },
            },
        },
    ]);

    return result;
}

// basic use summary
async function getUsageSummary() {
    const totalBookings = await Booking.countDocuments();
    const totalUsers = await User.countDocuments();

    const perUser = await Booking.aggregate([
        {
            $group: {
                _id: '$userId',
                count: { $sum: 1 },
            },
        },
        {
            $lookup: {
                from: 'users',
                localField: '_id',
                foreignField: '_id',
                as: 'user',
            },
        },
        {
            $unwind: '$user',
        },
        {
            $project: {
                userId: '$_id',
                userName: '$user.name',
                count: 1,
            },
        },
        {
            $sort: { count: -1 },
        },
    ]);

    return {
        totalBookings,
        totalUsers,
        perUser,
    };
}

module.exports = {
    getBookingsGroupedByUser,
    getUsageSummary,
};