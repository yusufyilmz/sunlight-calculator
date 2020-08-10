
export interface IBuilding {
  getName : () => string;
  getApartmentCount : () => number;
  getDistance :() => number;
}

export default class Building implements IBuilding {
  name: string;
  apartmentCount: number;
  distance: number;
  apartmentHeight: number;

  constructor(name: string, apartmentCount: number, distance: number, apartmentHeight: number) {
    this.name = name;
    this.apartmentCount = apartmentCount;
    this.distance = distance;
    this.apartmentHeight = apartmentHeight;
  }
  getName = () => {
    return this.name;
  }

  getApartmentCount =  () => {
    return this.apartmentCount;
  }

  getDistance =  () => {
    return this.distance;
  }
}
