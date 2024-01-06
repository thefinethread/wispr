const apiResponse = (res, statusCode, message, data) => {
  res.status(statusCode || 200).json({
    message: message || 'OK',
    data,
    success: true,
  });
};

module.exports = apiResponse;
