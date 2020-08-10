import { BuildingDirection, DegreeWithDirection } from '../utils/types';

export interface ITimeService {
  calculateTime(degree: DegreeWithDirection): string;
}

export default class TimeService {

  totalSunRiseMinutes: number;
  totalSunSetMinutes: number;
  totalDaylightMinutes: number;

  constructor(sunriseDateTime: string, sunsetDateTime: string) {
    const [sunRiseHour, sunRiseMinute] = sunriseDateTime.split(':').map(x => Number(x));
    const [sunSetHour, sunSetMinute] = sunsetDateTime.split(':').map(x => Number(x));

    this.totalSunRiseMinutes = sunRiseHour * 60 + sunRiseMinute;
    this.totalSunSetMinutes = sunSetHour * 60 + sunSetMinute;
    this.totalDaylightMinutes = (this.totalSunSetMinutes) - (this.totalSunRiseMinutes);
  }

  private convertMinutesToHoursMins(mins: number) {
    const h = Math.floor(mins / 60);
    const m = Math.floor(mins % 60);
    const hour = h < 10 ? `0${h}` : h;
    const min = m < 10 ? `0${m}` : m;
    return `${hour}:${min}:00`;
  }

  private calculateTimeFromDegrees = (degree: DegreeWithDirection) => {
    let totalMinutes = this.totalDaylightMinutes * degree.degree / 180;

    totalMinutes = degree.direction === BuildingDirection.east ?
      totalMinutes + this.totalSunRiseMinutes :
      this.totalSunSetMinutes - totalMinutes;

    return this.convertMinutesToHoursMins(totalMinutes);
  }

  calculateTime(degree: DegreeWithDirection): string {

    if (degree.degree === 0) {
      return degree.direction === BuildingDirection.east ?
        this.convertMinutesToHoursMins(this.totalSunRiseMinutes) :
        this.convertMinutesToHoursMins(this.totalSunSetMinutes);
    }

    return this.calculateTimeFromDegrees(degree);
  }
}
