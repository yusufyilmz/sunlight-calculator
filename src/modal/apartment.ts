
import { IBuilding } from './building';
import { findHeightDiff, findDistance, calculateDegree } from '../utils/index';
import { BuildingDirection, DegreeWithDirection } from '../utils/types';

export interface IApartment {
  getNeighbourhoodName: () => string;
  getApartmentHeight: () => number;
  getNumber: () => number;
  getBuilding: () => IBuilding;
  getNeighbourBuildings: () => IBuilding[];
  setBuilding: (building: IBuilding) => void;
  addNeighbourBuilding: (building: IBuilding) => void;
  calculateDegreesBetweenNeighbourBuildings : () => DegreeWithDirection[];
}

export default class Apartment implements IApartment {
  apartmentNumber: number;
  building: IBuilding;
  neighbourhoodName: string;
  distance: number;
  neighbourBuildings: IBuilding[];
  apartmentHeight: number;

  constructor(number: number, apartmentHeight: number) {
    this.apartmentNumber = number;
    this.building = null;
    this.apartmentHeight = apartmentHeight;
    this.neighbourBuildings = [];
  }

  setBuilding = (building: IBuilding) => {
    return this.building = building;
  }

  addNeighbourBuilding = (building: IBuilding) => {
    return this.neighbourBuildings.push(building);
  }

  getNumber = () => {
    return this.apartmentNumber;
  }

  getBuilding = () => {
    return this.building;
  }

  getNeighbourBuildings = () => {
    return this.neighbourBuildings;
  }

  getNeighbourhoodName = () => {
    return this.neighbourhoodName;
  }

  getApartmentHeight = () => {
    return this.apartmentHeight;
  }

  calculateDegreesBetweenNeighbourBuildings = (): DegreeWithDirection[] => {

    return this.getNeighbourBuildings().map((neighbourBuilding: IBuilding) => {

      const distance = findDistance(
        this.getBuilding().getDistance(),
        neighbourBuilding.getDistance());
      const height = findHeightDiff(
        neighbourBuilding.getApartmentCount(),
        this.getNumber(),
        this.getApartmentHeight()
      );
      const degree = calculateDegree(height, distance);

      return {
        degree,
        direction: neighbourBuilding.getDistance() < this.getBuilding().getDistance() ?
          BuildingDirection.east :
          BuildingDirection.west
      };
    });
  }
}
