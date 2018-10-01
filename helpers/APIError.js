const sendAPIError = (message, status, next) => {
    const APIError = {
        message: message,
        status: status,
    }
    next(APIError)
}

module.exports = { sendAPIError }