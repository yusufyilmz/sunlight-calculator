import { IBuilding } from './building';

export interface INeighbourHood {
  addBuilding : (building: IBuilding) => void;
  getBuildings : () => IBuilding[];
  getName: () => string;
  getApartmentsHeight: () => number ;
}

export default class NeighbourHood implements INeighbourHood {

  name: string;
  buildings: IBuilding[];
  apartmentsHeight: number;

  constructor(name: string, apartmentsHeight: number) {
    this.name = name;
    this.apartmentsHeight = apartmentsHeight;
    this.buildings = [];
  }

  addBuilding = (building: IBuilding) => {
    this.buildings.push(building);
  }

  getBuildings = () => {
    return this.buildings;
  }

  getName = () => {
    return this.name;
  }

  getApartmentsHeight = () => {
    return this.apartmentsHeight;
  }
}
