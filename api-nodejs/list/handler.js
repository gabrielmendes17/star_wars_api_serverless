'use strict';

const databaseManager = require('../databaseManager');

module.exports.list = async event => {
  const items = await databaseManager.scan();

  return {
    statusCode: 200,
    body: JSON.stringify({message: items}),
  };
};