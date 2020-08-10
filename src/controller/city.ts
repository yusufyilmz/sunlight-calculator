import * as express from 'express';
import Controller from './controller';
import { ICityService } from '../services/city';
import CityDto from '../validation/City';
import validationMiddleware from '../middlewares/validation';
import CityInitException from '../exceptions/cityInitException';
import City from '../validation/city';

export default class CityController implements Controller {
  public path = '/init';

  public router = express.Router();
  private cityService: ICityService;

  constructor(cityService : ICityService) {
    this.cityService = cityService;
    this.intializeRoutes();
  }

  public intializeRoutes() {
    this.router.post(this.path, validationMiddleware(CityDto), this.init);
  }

  init = (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction) => {
    try {
      const city: City = request.body;
      this.cityService.init(city);
      response.sendStatus(200);

    } catch (e) {
      next(new CityInitException());
    }

  }
}
