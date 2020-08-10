// tslint:disable max-line-length
import App from '../app';
import * as request from 'supertest';
import City, { ICity } from '../modal/city';
import CityService, { ICityService } from '../services/city';
import CityController from './city';

describe('The CityController', () => {
  describe('Initialize City', () => {

    const city: ICity = new City('Barcelona');
    const cityService: ICityService = new CityService(city);
    let cityController: CityController;
    let app: App;

    beforeEach(() => {
      cityController = new CityController(cityService);
      app = new App([
        cityController
      ],            5000);
    });

    it('response should return validation error if there is no neighbourhood', () => {
      const userData = {
        neighbourhoods: [{
          apartments_height: 2.5,
          buildings: [
            {
              name: 'A1',
              apartments_count: 5,
              distance: 10
            }]
        }]
      };

      return request(app.getServer())
        .post(`${cityController.path}`)
        .send(userData)
        .expect({ status: 400, message: 'neighbourhood must be a string,neighbourhood must be longer than or equal to 1 characters' });
    });

    it('response should return validation error if there is no neighbourhood', () => {
      const userData = {
        neighbourhoods: [{
          neighbourhood: 'aa',
        }]
      };
      return request(app.getServer())
        .post(`${cityController.path}`)
        .send(userData)
        .expect({ status: 400, message: 'apartments_height must be a number conforming to the specified constraints' });
    });

    it('response should return validation error if there is no building', () => {
      const userData = {
        neighbourhoods: [{
          neighbourhood: 'aa',
          apartments_height: 2.5
        }]
      };
      return request(app.getServer())
        .post(`${cityController.path}`)
        .send(userData)
        .expect({ status: 400, message: 'buildings must be an array,' });
    });

    it('response should return validation error if there is no distance', () => {
      const userData = {
        neighbourhoods: [{
          neighbourhood: 'aa',
          apartments_height: 2.5,
          buildings : [{
            name: 'A1',
            apartments_count: 5,
          }]
        }]
      };
      return request(app.getServer())
        .post(`${cityController.path}`)
        .send(userData)
        .expect({ status: 400, message: 'distance must be a number conforming to the specified constraints' });
    });

    it('response should return validation error if there is no neighbourhood', () => {
      const userData = {
        neighbourhoods: [{
          neighbourhood: 'aa',
          apartments_height: 2.5,
          buildings: [
            {
              name: 'A1',
              apartments_count: 5,
              distance: 10
            }]
        }]
      };

      return request(app.getServer())
        .post(`${cityController.path}`)
        .send(userData)
        .expect((res) => {
          expect(res.status).toEqual(200);
        });
    });
  });
});
