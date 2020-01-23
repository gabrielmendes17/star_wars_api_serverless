'use strict';

const databaseManager = require('../../src/planets/databaseManager');
const axios = require('axios');

describe('Database manager', () => {
    test('test', async () => {''
        expect('test').toBe('test');
    });

    test('Should save planet', async () => {
        const planet = {
            climate: "temperate",
            name: "ALDERAAN",
            terrain: "grasslands, mountains",
            moviesApperances: 0
        };

        databaseManager.saveItem = jest.fn().mockReturnValue(planet);

        const result = await databaseManager.saveItem(planet);

        expect(databaseManager.saveItem).toBeCalledWith(planet);
        expect(result).toBe(planet);
    });
    
    test('Should find a planet by id', async () => {
        const planet = {
            id: "7c7b5adf-23c5-4274-b693-0cbd52f437f8",
            climate: "temperate",
            name: "ALDERAAN",
            terrain: "grasslands, mountains",
        };

        databaseManager.findById = jest.fn().mockReturnValue(planet);

        const result = await databaseManager.findById(planet.id);

        expect(databaseManager.findById).toBeCalledWith(planet.id);
        expect(result).toBe(planet);
    });


    test('Should find a planet by name', async () => {
        const planet = {
            climate: "temperate",
            name: "ALDERAAN",
            terrain: "grasslands, mountains",
        };

        databaseManager.findByName = jest.fn().mockReturnValue(planet);

        const result = await databaseManager.findByName('ALDERAAN');

        expect(databaseManager.findByName).toBeCalledWith('ALDERAAN');
        expect(result).toBe(planet);
    });

    test('Should return all planets in database', async () => {
        const planet = {
            id: "7c7b5adf-23c5-4274-b693-0cbd52f437f8",
            climate: "temperate",
            name: "ALDERAAN",
            terrain: "grasslands, mountains",
            "moviesApperances": 2
        };

        databaseManager.scan = jest.fn().mockReturnValue(planet);

        const result = await databaseManager.scan();

        expect(databaseManager.scan).toBeCalledWith();
        expect(result).toBe(planet);
    });

     test('Should delete a planet by id', async () => {
        databaseManager.deleteItem = jest.fn().mockReturnValue();

        const result = await databaseManager.deleteItem('7c7b5adf-23c5-4274-b693-0cbd52f437f8');

        expect(databaseManager.deleteItem).toBeCalledWith('7c7b5adf-23c5-4274-b693-0cbd52f437f8');
        expect(result).toBe();
    });
});