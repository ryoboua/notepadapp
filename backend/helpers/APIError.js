const sendAPIError = (message, status, next, target = 'APIError') => {
    const APIError = {
        target: target,
        message: message,
        status: status,
    }
    next(APIError)
}

module.exports = { sendAPIError }