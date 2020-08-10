import { ICity } from '../modal/city';
import NeighbourHood, { INeighbourHood } from '../modal/neighbourHood';
import Building, { IBuilding } from '../modal/building';
import City from '../validation/city';
import NeighbourHoodDto from '../validation/NeighbourHoods';
import BuildingDto from '../validation/Building';

export interface ICityService {
  init : (city: City) => void;
}

export default class CityService implements ICityService {

  city: ICity;

  constructor(city: ICity) {
    this.city = city;
  }

  init = (city: City) => {

    city.neighbourhoods.map((neighbourHoodObject: NeighbourHoodDto) => {
      const neighborhood: INeighbourHood = this.createNeighbourhood(neighbourHoodObject);
      this.city.addNeighbourhood(neighborhood);
    });
  }

  private createNeighbourhood(neighbourHoodObject: NeighbourHoodDto) {

    const { neighbourhood, apartments_height, buildings } = neighbourHoodObject;
    const neighborhood: INeighbourHood = new NeighbourHood(neighbourhood, apartments_height);

    buildings.sort((a: any, b: any) => {
      return a.distance - b.distance;
    });

    buildings.map((building: BuildingDto) => {

      const buildingObject: IBuilding = this.createBuilding(building, apartments_height);

      neighborhood.addBuilding(buildingObject);
    });

    return neighborhood;
  }

  private createBuilding(building: BuildingDto, apartmentsHeight: any) {

    const { name, apartments_count, distance } = building;

    const buildingObject: IBuilding = new Building(
            name,
            apartments_count,
            distance,
            apartmentsHeight
        );
    return buildingObject;
  }
}
