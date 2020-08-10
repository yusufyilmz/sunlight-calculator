import { INeighbourHood } from './neighbourHood';

export interface ICity {
  addNeighbourhood: (neighbourHood: INeighbourHood) => void;
  getNeighbourhoods: () => INeighbourHood[];
}

export default class City implements ICity {

  name: string;
  neighbourHoods: INeighbourHood[];

  constructor(name: string) {
    this.name = name;
    this.neighbourHoods = [];
  }

  addNeighbourhood = (neighbourHood: INeighbourHood) => {
    this.neighbourHoods.push(neighbourHood);
  }

  getNeighbourhoods = () => {
    return this.neighbourHoods;
  }
}
