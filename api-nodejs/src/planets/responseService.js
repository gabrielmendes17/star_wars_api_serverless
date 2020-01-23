module.exports.createResponse = (statusCode, message) => {
  return {
    statusCode,
    body: JSON.stringify(message)
  };
}
