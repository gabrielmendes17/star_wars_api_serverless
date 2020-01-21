'use strict';

const uuid = require('uuid/v4');
const AWS = require('aws-sdk');
AWS.config.update({
  region: process.env.AWS_REGION
});
const documentClient = new AWS.DynamoDB.DocumentClient();


module.exports.create = async event => {
  const body = JSON.parse(event.body);

  await documentClient.put({
    TableName: process.env.DYNAMODB_USERS,
    Item: {
      id: uuid(),
      name: body.name,
      climate: body.climate,
      terrain: body.terrain
    }
  }).promise();

  return {
    statusCode: 201,
    body: JSON.stringify(
      {
        message: "Planeta inserido com sucesso!"
      },
    ),
  };
};
