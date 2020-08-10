import { ICity } from '../modal/city';
import { IBuilding } from '../modal/building';
import Apartment, { IApartment } from '../modal/apartment';
import { INeighbourHood } from 'modal/neighbourHood';
import HttpException from '../exceptions/httpException';
import CityIsNotInitializedException from '../exceptions/cityIsNotInitializedException';
import NeighbourHoodNotFoundException from '../exceptions/neighbourHoodNotFoundException';
import BuildingNotFoundException from '../exceptions/buildingNotFoundException';

export interface IApartmentService {
  findApartment: (neighbourhoodName: string, building: string, apartmentNumber: number) => any;
}

export default class ApartmentService implements IApartmentService {

  city: ICity;

  constructor(city: ICity) {
    this.city = city;
  }

  private findNeighbourHood = (neighbourhoodName: string) => {
    if (this.city.getNeighbourhoods().length === 0) return null;

    return this.city.getNeighbourhoods().find(x => x.getName() === neighbourhoodName);
  }

  private findBuildings(neighbourHood: INeighbourHood,
                        buildingName: string,
                        apartment: IApartment) {
    neighbourHood.getBuildings().map((building: IBuilding) => {

      if (building.getName() === buildingName) {
        apartment.setBuilding(building);
      } else {
        apartment.addNeighbourBuilding(building);
      }
    });
  }

  findApartment(neighbourhoodName: string,
                buildingName: string,
                apartmentNumber: number): IApartment {

    if (this.city.getNeighbourhoods().length === 0) {
      throw(new CityIsNotInitializedException());
    }

    const neighbourHood = this.findNeighbourHood(neighbourhoodName);

    if (!neighbourHood) return null;

    const apartment: IApartment = new Apartment(apartmentNumber,
                                                neighbourHood.getApartmentsHeight());

    this.findBuildings(neighbourHood, buildingName, apartment);

    return apartment;
  }
}
