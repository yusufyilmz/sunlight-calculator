import * as express from 'express';
import Controller from './controller';
import { IApartmentService } from '../services/apartment';
import { ISunlightService } from '../services/sunlight';
import validationMiddleware from '../middlewares/validation';
import ApartmentDto from '../validation/Apartment';
import ApartmentNotFoundException from '../exceptions/apartmentNotFoundException';
import { IApartment } from '../modal/apartment';
import BuildingNotFoundException from '../exceptions/buildingNotFoundException';
import NeighbourHoodNotFoundException from '../exceptions/neighbourHoodNotFoundException';

export default class ApartmentController implements Controller {
  public path = '/getSunlightHours';

  public router = express.Router();
  private apartmentService: IApartmentService;
  private sunlightService: ISunlightService;

  constructor(apartmentService: IApartmentService, sunlightService: ISunlightService) {
    this.apartmentService = apartmentService;
    this.sunlightService = sunlightService;
    this.intializeRoutes();
  }

  public intializeRoutes() {
    this.router.post(this.path, validationMiddleware(ApartmentDto), this.getSunlightHours);
  }

  getSunlightHours = (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction) => {

    const { neighbourhoodName, building, apartmentNumber } : ApartmentDto = request.body;
    const apartment: IApartment =
      this.apartmentService.findApartment(neighbourhoodName, building, apartmentNumber);

    if (!apartment) {
      return next(new NeighbourHoodNotFoundException(neighbourhoodName));
    }

    if (!apartment.getBuilding()) {
      return next(new BuildingNotFoundException(neighbourhoodName, building));
    }

    if (apartment.getNumber() > apartment.getBuilding().getApartmentCount()) {
      return next(new ApartmentNotFoundException(apartmentNumber, building, neighbourhoodName));
    }

    const sunlightHours = this.sunlightService.getSunlightHours(apartment);
    response.json(sunlightHours);
  }
}
