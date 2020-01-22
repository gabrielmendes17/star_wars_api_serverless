'use strict';

const databaseManager = require('../databaseManager');
const uuid = require('uuid/v4');

module.exports.create = async event => {
  let item = JSON.parse(event.body);
  item.id = uuid(),
  await databaseManager.saveItem(item);

  return {
    statusCode: 201,
    body: JSON.stringify(
      {
        message: `Planet ${item.name} saved sucessfully !`
      },
    ),
  };
};