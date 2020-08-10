import App from './app';
import City, { ICity } from './modal/city';
import CityController from './controller/city';
import ApartmentController from './controller/apartment';
import CityService, { ICityService } from './services/city';
import ApartmentService, { IApartmentService } from './services/apartment';
import TimeService, { ITimeService } from './services/time';
import SunlightService, { ISunlightService } from './services/sunlight';

const city: ICity = new City('Barcelona');
const cityService: ICityService = new CityService(city);
const timeService: ITimeService = new TimeService('08:14', '17:25');
const sunlightService: ISunlightService = new SunlightService(timeService);
const apartmentService: IApartmentService = new ApartmentService(city);

const app = new App(
  [
    new CityController(cityService),
    new ApartmentController(apartmentService, sunlightService),
  ],
  5000,
);

app.listen();
