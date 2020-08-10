export type SunlightTimes = {
  startTime :  string,
  endTime: string
};

export enum BuildingDirection {
    east = 'east',
    west = 'west'
}

export type DegreeWithDirection = {
  degree : number;
  direction : BuildingDirection
};
