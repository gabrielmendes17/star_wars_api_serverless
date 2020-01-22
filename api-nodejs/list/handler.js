'use strict';

const AWS = require('aws-sdk');
AWS.config.update({
  region: process.env.AWS_REGION
});
const documentClient = new AWS.DynamoDB.DocumentClient();

module.exports.list = async event => {
  const data = await documentClient.scan({
    TableName: process.env.DYNAMODB_PLANETS
  }).promise();

  return {
    statusCode: 200,
    body: JSON.stringify({message: data.Items}),
  };
};