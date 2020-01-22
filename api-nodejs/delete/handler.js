'use strict';

const databaseManager = require('../databaseManager');

module.exports.delete = async event => {
  const planetId = event.pathParameters.id;
  await databaseManager.deleteItem(planetId);
  return { statusCode: 204 };
};