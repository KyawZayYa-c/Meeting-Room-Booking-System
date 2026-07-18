const canDeleteBooking = (user, booking) => {

    if (user.role === 'admin' || user.role === 'owner') {
        return true;
    }
    console.log('user Id : ' + user._id.toString() );
    console.log('Booking Id : ' + booking.userId._id.toString());

    if (user.role === 'user') {
        return user._id.toString() === booking.userId._id.toString();
    }


    return false;
};

const canManageUsers = (user) => {
    return user.role === 'admin';
};

const canViewSummary = (user) => {
    return user.role === 'admin' || user.role === 'owner';
};

const canChangeRole = (user) => {
    return user.role === 'admin';
};

module.exports = {
    canDeleteBooking,
    canManageUsers,
    canViewSummary,
    canChangeRole,
};