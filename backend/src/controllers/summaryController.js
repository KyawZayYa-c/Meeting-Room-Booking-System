const {
    getBookingsGroupedByUser,
    getUsageSummary,
} = require('../services/summaryService');

const { canViewSummary } = require('../services/permissionService');
const { Msg, MsgError } = require('../utils/responseHelper');

const getGrouped = async (req, res) => {
    try {
        if (!canViewSummary(req.user)) {
            return MsgError(res, 'Owner or Admin access required', 403);
        }

        const result = await getBookingsGroupedByUser();
        Msg(res, 'Bookings grouped by user retrieved successfully', { data: result }, 200);
    } catch (error) {
        MsgError(res, error.message, 500);
    }
};

const getUsage = async (req, res) => {
    try {
        if (!canViewSummary(req.user)) {
            return MsgError(res, 'Owner or Admin access required', 403);
        }

        const result = await getUsageSummary();
        Msg(res, 'Usage summary retrieved successfully', { data: result }, 200);
    } catch (error) {
        MsgError(res, error.message, 500);
    }
};

module.exports = {
    getGrouped,
    getUsage,
};