// Original Msg function (from your utils.js)
const Msg = (res, msg = '', result = {}, statusCode = 200) => {
    res.status(statusCode).json({
        success: true,
        message: msg,
        data: result,
    });
};

// Error version
const MsgError = (res, msg = '', statusCode = 400, errors = null) => {
    const response = {
        success: false,
        message: msg,
    };

    if (errors) {
        response.errors = errors;
    }

    res.status(statusCode).json(response);
};

module.exports = {
    Msg,
    MsgError,
};