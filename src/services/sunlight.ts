import { IApartment } from '../modal/apartment';
import { ITimeService } from './time';
import { SunlightTimes, BuildingDirection, DegreeWithDirection } from '../utils/types';
import { groupBy } from 'utils';

export interface ISunlightService {
  getSunlightHours: (apartment: IApartment) => any;
}

export default class SunlightService implements ISunlightService {

  timeService: ITimeService;

  constructor(timeService: ITimeService) {
    this.timeService = timeService;
  }

  getSunlightHours(apartment: IApartment): SunlightTimes {

    const degrees: DegreeWithDirection[] = apartment.calculateDegreesBetweenNeighbourBuildings();

    const sunlights = {
      startTime: this.calculateSunlightHour(degrees, BuildingDirection.east),
      endTime: this.calculateSunlightHour(degrees, BuildingDirection.west)
    };

    return sunlights;
  }

  private calculateSunlightHour = (
    degrees: DegreeWithDirection[],
    direction: BuildingDirection) => {
    const sideBuildings = degrees.filter((x: DegreeWithDirection) => x.direction === direction);

    const maxDegree = sideBuildings.length > 0 ?
      sideBuildings.reduce((a: any, b: any) => a.degree > b.degree ? a : b) :
      { direction, degree: 0 };

    return this.timeService.calculateTime(maxDegree);
  }
}
