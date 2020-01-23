'use strict';

const AWS = require('aws-sdk');
AWS.config.update({
  region: process.env.AWS_REGION
});
const uuid = require('uuid/v4');
let dynamo = new AWS.DynamoDB.DocumentClient();

const TABLE_NAME = process.env.DYNAMODB_PLANETS;

module.exports.initializateDynamoClient = newDynamo => {
  dynamo = newDynamo;
};

module.exports.saveItem = async (item) => {
  const params = {
    TableName: TABLE_NAME,
    Item: { 
      id: uuid(),
      name: item.name.toUpperCase(),
      terrain: item.terrain,
      climate: item.climate,
      moviesApperances: item.moviesApperances
    }
  };
  const response = await dynamo.put(params).promise();
    return response;
};

module.exports.findById = async (itemId) => {
  const params = {
    Key: {
      id: itemId
    },
    TableName: TABLE_NAME
  };

  const result = await dynamo.get(params).promise();
    return result.Item;
};

module.exports.findByName = async (planetName) => {
  const params = {
    TableName: TABLE_NAME,
    FilterExpression: 'contains(#nm, :param)',
    ExpressionAttributeNames: {
      "#nm" : "name"
    },
    ExpressionAttributeValues: {
      ':param': planetName.toUpperCase()
    }
  };

  const result = await dynamo.scan(params).promise();
    return result.Items;
}

module.exports.scan = async () => {
  const data = await dynamo.scan({TableName: TABLE_NAME}).promise();
    return data.Items;
};

module.exports.deleteItem = itemId => {
  const params = {
    Key: {
      id: itemId
    },
    TableName: TABLE_NAME
  };

  return dynamo.delete(params).promise();
};

module.exports.updateItem = async (itemId, paramsName, paramsValue) => {
  const params = {
    TableName: TABLE_NAME,
    Key: {
      id
    },
    ConditionExpression: 'attribute_exists(itemId)',
    UpdateExpression: `set ${  paramsName  } = :v`,
    ExpressionAttributeValues: {
      ':v': paramsValue
    },
    ReturnValues: 'ALL_NEW'
  };
  const response = await dynamo.update(params).promise();
    return response.Attributes;
};