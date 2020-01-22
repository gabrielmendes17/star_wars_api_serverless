module.exports.createResponse = (statusCode, message) => {
  return {
    statusCode: statusCode,
    body: JSON.stringify(message)
  };
}
