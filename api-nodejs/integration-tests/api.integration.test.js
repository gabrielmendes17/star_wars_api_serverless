'use strict';

const init = require('./utils/init');
const axios = require('axios');


describe('When we invoke the hello API', () => {  
    var planet;
    beforeAll(async () => {
        init();
        await axios.post(`${process.env.BASE_URL}`,{
            name: "Endor",
            climate: "temperate",
            terrain: "forests, mountains, lakes"
        });
        let { data } = await axios.get(`${process.env.BASE_URL}/name/Endor`);
        planet = data[0];
      });

    test('Should return the number of  movies apperances from swapi', async () => {
        const swapiResponse = await axios.get('https://swapi.co/api/planets/?name=Alderaan');
        swapiResponse.data.results[0].films.length
        expect(swapiResponse.status).toBe(200);
        expect(swapiResponse.data.results[0].films.length).toBe(2);
    });

    test('Should list all planets', async () => {
        const response = await axios.get(`${process.env.BASE_URL}`);
        expect(response.status).toBe(200);
        expect(response.data.length).not.toBe(0);
    });

    test('Should get movies apperances from swapi before save data', async () => {
        const response = await axios.get(`${process.env.BASE_URL}`);
        expect(response.data[0].moviesApperances).not.toBe(0);
    });

    test('Should save a planet given name, climate and terrain', async () => {
        const response = await axios.post(`${process.env.BASE_URL}`,{
            name: "Alderaan",
            climate: "temperate",
            terrain: "grasslands, mountains"
        });
        expect(response.status).toBe(201);
        expect(response.statusText).toBe('Created');
        expect(response.data).toContain('saved sucessfully !');
    });

    test('Should find a planet by id', async () => {
        const response = await axios.get(`${process.env.BASE_URL}/${planet.id}`);
        console.log(response);
        expect(response.status).toBe(200);
        expect(response.statusText).toBe('OK');
    });

    test('Should find a planet by name', async () => {
        const response = await axios.get(`${process.env.BASE_URL}/name/${planet.name}`);
        expect(response.status).toBe(200);
        expect(response.statusText).toBe('OK');
        expect(response.data.length).not.toBe(0);
    });

    test('Should delete a planet by id', async () => {
        const response = await axios.delete(`${process.env.BASE_URL}/${planet.id}`);
        expect(response.status).toBe(204);
        expect(response.statusText).toBe('No Content');
    });
});