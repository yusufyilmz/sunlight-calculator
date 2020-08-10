// tslint:disable max-line-length
import App from '../app';
import ApartmentController from './apartment';
import * as request from 'supertest';
import ApartmentDto from '../validation/Apartment';
import City, { ICity } from '../modal/city';
import CityService, { ICityService } from '../services/city';
import TimeService, { ITimeService } from '../services/time';
import SunlightService, { ISunlightService } from '../services/sunlight';
import ApartmentService, { IApartmentService } from '../services/apartment';
import CityController from './city';
import CityDto from '../validation/city';

const test: CityDto = {
  neighbourhoods: [{
    neighbourhood: 'Eixample',
    apartments_height: 2.5,
    buildings: [
      {
        name: 'A1',
        apartments_count: 5,
        distance: 10
      },
      {
        name: 'A2',
        apartments_count: 10,
        distance: 20
      },
      {
        name: 'A3',
        apartments_count: 4,
        distance: 30
      },
      {
        name: 'A4',
        apartments_count: 1,
        distance: 40
      },
      {
        name: 'A5',
        apartments_count: 30,
        distance: 50
      }
    ]
  }]};

const testData2: CityDto  = {
  neighbourhoods: [{
    neighbourhood: 'Gracia',
    apartments_height: 2.5,
    buildings: [
      {
        name: 'A1',
        apartments_count: 100,
        distance: 10
      },
      {
        name: 'A2',
        apartments_count: 1,
        distance: 20
      },
      {
        name: 'A3',
        apartments_count: 100,
        distance: 30
      }
    ]
  }]};

const testData3: CityDto  = {
  neighbourhoods: [{
    neighbourhood: 'Corts',
    apartments_height: 2.5,
    buildings: [
      {
        name: 'A1',
        apartments_count: 4,
        distance: 10
      },
      {
        name: 'A2',
        apartments_count: 1,
        distance: 20
      },
      {
        name: 'A3',
        apartments_count: 4,
        distance: 30
      }
    ]
  }]};

describe('The ApartmentController', () => {
  describe('Get sunlight hours', () => {

    const city: ICity = new City('Barcelona');
    const cityService: ICityService = new CityService(city);
    const timeService: ITimeService = new TimeService('06:00', '18:00');
    const sunlightService: ISunlightService = new SunlightService(timeService);
    const apartmentService: IApartmentService = new ApartmentService(city);
    let cityController: CityController;
    let apartmentController: ApartmentController;
    let app: App;

    beforeEach(() => {
      cityController = new CityController(cityService);
      apartmentController = new ApartmentController(apartmentService, sunlightService);
      app = new App([
        apartmentController,
        cityController
      ],            5000);
    });

    it('response should have the city is not initialized exception if there is no neighhbourhood', () => {
      const userData: ApartmentDto = {
        neighbourhoodName: 'Eixample',
        building: 'A1',
        apartmentNumber: 1,
      };

      return request(app.getServer())
                .post(`${apartmentController.path}`)
                .send(userData)
                .expect({ status: 404, message: 'City is not initialized' });
    });

    it('response should return validation error if there is no building', () => {
      const userData = {
        neighbourhoodName: 'Eixample2',
        apartmentNumber: 1,
      };

      cityService.init(test);

      return request(app.getServer())
                    .post(`${apartmentController.path}`)
                    .send(userData)
                    .expect({ status: 400, message: 'building must be a string,building must be longer than or equal to 1 characters' });
    });

    it('response should return validation error if there is no neighbourhoodName', () => {
      const userData = {
        building: 'A7',
        apartmentNumber: 1,
      };

      cityService.init(test);

      return request(app.getServer())
                    .post(`${apartmentController.path}`)
                    .send(userData)
                    .expect({ status: 400, message: 'neighbourhoodName must be a string,neighbourhoodName must be longer than or equal to 1 characters' });
    });

    it('response should return validation error if there is no apartmentNumber', () => {
      const userData = {
        neighbourhoodName: 'Eixample2',
        building: 'A7',
      };

      cityService.init(test);

      return request(app.getServer())
                    .post(`${apartmentController.path}`)
                    .send(userData)
                    .expect({ status: 400, message: 'apartmentNumber must not be greater than 20,apartmentNumber must not be less than 1,apartmentNumber must be an integer number' });
    });

    it('response should return neighbourHood not found exception if neighbourHood not exist in city', () => {
      const userData: ApartmentDto = {
        neighbourhoodName: 'Eixample2',
        building: 'A1',
        apartmentNumber: 1,
      };

      cityService.init(test);

      return request(app.getServer())
                  .post(`${apartmentController.path}`)
                  .send(userData)
                  .expect({ status: 404, message: 'Eixample2 neighbourHood is not found' });
    });

    it('response should return building not found exception if building not exist in neighbourhood', () => {
      const userData: ApartmentDto = {
        neighbourhoodName: 'Eixample',
        building: 'A77',
        apartmentNumber: 1,
      };

      cityService.init(test);

      return request(app.getServer())
                  .post(`${apartmentController.path}`)
                  .send(userData)
                  .expect({ status: 404, message: 'A77 building is not found at Eixample neighbourHood' });
    });

    it('response should return apartment not found exception if apartment not exist in building', () => {
      const userData: ApartmentDto = {
        neighbourhoodName: 'Eixample',
        building: 'A1',
        apartmentNumber: 20,
      };

      cityService.init(test);

      return request(app.getServer())
                  .post(`${apartmentController.path}`)
                  .send(userData)
                  .expect({ status: 404, message: 'Apartment with number 20, is not found at A1, Eixample' });
    });

    it('building should start to get sunlight with the rise of sun if there is no building at the east direction', () => {
      const userData: ApartmentDto = {
        neighbourhoodName: 'Eixample',
        building: 'A1',
        apartmentNumber: 1,
      };

      cityService.init(test);

      return request(app.getServer())
                .post(`${apartmentController.path}`)
                .send(userData)
                .expect((res) => {
                  expect(res.body).toEqual({  startTime: '06:00:00', endTime: '13:27:00' });
                });
    });

    it('building should start to get sunlight until the sunset if there is no building at the west direction', () => {
      const userData: ApartmentDto = {
        neighbourhoodName: 'Eixample',
        building: 'A5',
        apartmentNumber: 1,
      };

      cityService.init(test);

      return request(app.getServer())
                  .post(`${apartmentController.path}`)
                  .send(userData)
                  .expect((res) => {
                    expect(res.body).toEqual({ startTime: '08:39:00', endTime: '18:00:00' });
                  });
    });

    it('building should only get sunlight a few minutes if the neighbour buildings are too close and too high', () => {
      const userData: ApartmentDto = {
        neighbourhoodName: 'Gracia',
        building: 'A2',
        apartmentNumber: 1,
      };

      cityService.init(testData2);

      return request(app.getServer())
                      .post(`${apartmentController.path}`)
                      .send(userData)
                      .expect((res) => {
                        expect(res.body).toEqual({ startTime: '11:50:00', endTime: '12:09:00' });
                      });
    });

    it('building should get sunlight x hours after sun rise and x hours until sunset if the distance and height difference from apartment is equal each other( since degree is 45)', () => {
      const userData: ApartmentDto = {
        neighbourhoodName: 'Corts',
        building: 'A2',
        apartmentNumber: 1,
      };

      cityService.init(testData3);

      return request(app.getServer())
                      .post(`${apartmentController.path}`)
                      .send(userData)
                      .expect((res) => {
                        expect(res.body).toEqual({ startTime: '09:00:00', endTime: '15:00:00',  });
                      });
    });
  });
});
