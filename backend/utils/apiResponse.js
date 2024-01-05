const apiResponse = (message, data) => {
  const response = {
    message: message || 'OK',
    data,
    success: true,
  };
  return response;
};

module.exports = apiResponse;
