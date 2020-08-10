export const calculateDegree = (height: number, distance: number) => {
  return Math.atan(height / distance) * 180 / Math.PI;
};

export const findDistance = (distance1: number, distance2: number) => {
  return Math.abs(distance1 - distance2);
};

export const findHeightDiff = (apartmentCount: number,
                               otherapartmentNumber: number,
                               unitHeight: number) => {

  if (apartmentCount < otherapartmentNumber + 1) return 0;

  return (apartmentCount - otherapartmentNumber + 1) * unitHeight;
};

export function groupBy(arr: any[], property: string) {
  return arr.reduce((memo, x) => {
    if (!memo[x[property]]) { memo[x[property]] = []; }
    memo[x[property]].push(x);
    return memo;
  },
                    {});
}
