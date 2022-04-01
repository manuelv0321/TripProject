const Datos = require('./Datos');
//test Post

describe("DataController", () => {

  describe("Test for metod Post", () => {
    it('should return an trip', async () => {
      const readings = {
        "readings": [
          {
            "time": 1642500462000,
            "speed": 9,
            "speedLimit": 38,
            "location": {
              "lat": -33.580158,
              "lon": -70.567227
            }
          },
          {
            "time": 1642500462000,
            "speed": 9,
            "speedLimit": 38,
            "location": {
              "lat": -33.580158,
              "lon": -70.567227
            }
          },
          {
            "time": 1642500462000,
            "speed": 9,
            "speedLimit": 38,
            "location": {
              "lat": -33.580158,
              "lon": -70.567227
            }
          },
          {
            "time": 1642500462000,
            "speed": 9,
            "speedLimit": 38,
            "location": {
              "lat": -33.580158,
              "lon": -70.567227
            }
          },
          {
            "time": 1642500462000,
            "speed": 9,
            "speedLimit": 38,
            "location": {
              "lat": -33.580158,
              "lon": -70.567227
            }
          }
        ]
      };


      const result = "Se Agrego Con Exito";


      jest.spyOn(Datos, 'InsertData').mockImplementation(async () => result);
      expect(await Datos.InsertData(readings)).toBe(result);

    });
  });

  //Test Get
  describe("Test for metod Get", () => {
    it('should return an array of trips', async () => {


      const data = [{

        "start_gte": 1642500461900,
        "start_lte": 1642500467001,
        "distance_gte": 0.119,
        "limit": 2,
        "offset": 0
      }]
      const result = [
        {
          "_id": "61e86253887450cb2726ff31",
          "boundingBox": [
            {
              "lat": -33.580158,
              "lon": -70.567227
            },
            {
              "lat": -33.58013,
              "lon": -70.566995
            },
            {
              "lat": -33.580117,
              "lon": -70.566633
            },
            {
              "lat": -33.580078,
              "lon": -70.566408
            },
            {
              "lat": -33.580005,
              "lon": -70.566498
            },
            {
              "lat": -33.58002,
              "lon": -70.566837
            },
            {
              "lat": -33.580038,
              "lon": -70.567265
            },
            {
              "lat": -33.580043,
              "lon": -70.56773
            },
            {
              "lat": -33.580048,
              "lon": -70.56817
            },
            {
              "lat": -33.580053,
              "lon": -70.568502
            }
          ],
          "overspeedsCount": 0,
          "duration": 36000,
          "distance": 0,
          "end": {
            "_id": "61e8931aedef85ddda34500a",
            "time": 1642500498000,
            "lat": -33.580053,
            "lon": -70.568502,
            "address": ""
          },
          "start": {
            "_id": "61e8931aedef85ddda34500b",
            "time": 1642500462000,
            "lat": -33.580158,
            "lon": -70.567227,
            "address": ""
          },
          "__v": 0
        },
      ];


      jest.spyOn(Datos, 'ObtenerDatos').mockImplementation(async () => result);
      expect(await Datos.ObtenerDatos(data)).toBe(result);

    });
  });
})



