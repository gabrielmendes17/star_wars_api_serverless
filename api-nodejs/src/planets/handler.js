'use strict';

const databaseManager = require('./databaseManager');
const reponseService = require('./responseService');
const axios = require('axios');

module.exports.findAll = async () => {
  const items = await databaseManager.scan();
  return reponseService.createResponse(200, items);
};

module.exports.findById = async event => {
    const planetId = event.pathParameters.id;
    const planet = await databaseManager.findById(planetId);
    return reponseService.createResponse(200, planet);
};

module.exports.findByName = async event => {
    console.log(event.pathParameters);
    const planetName = event.pathParameters.name;
    const planets = await databaseManager.findByName(planetName);
    return reponseService.createResponse(200, planets);
};

module.exports.delete = async event => {
  const planetId = event.pathParameters.id;
  await databaseManager.deleteItem(planetId);
  return reponseService.createResponse(204, null);
};

module.exports.create = async event => {
  const item = JSON.parse(event.body);
  if (await planetExists(item)) {
      return reponseService.createResponse(201, `Planet ${item.name} saved sucessfully !`);
  }
  item.moviesApperances = await getMoviesApperancesFromSwapi(item);
  await databaseManager.saveItem(item);
  return reponseService.createResponse(201, `Planet ${item.name} saved sucessfully !`);
};

async function planetExists(item) {
    const response = await databaseManager.findByName(item.name);
    if (response.length > 0) return true;
    return false;
}

async function getMoviesApperancesFromSwapi({ name }) {
    const swapiResponse = await axios.get(`https://swapi.co/api/planets/?search=${name}`);
    if (requestIsOk(swapiResponse)) {
        return swapiResponse.data.results[0].films.length;
    }
    return 0;
}

function requestIsOk(swapiResponse) {
    return swapiResponse.status === 200 && swapiResponse.statusText === 'OK';
}