export type Rating = {
    name: string;
    latitude: number;
    longitude: number;
    value: number;
}

// TODO implement
const getRatings = (monthIdx: number, idealTemperature: number, idealSunshine: number, idealPrecipitation: number, idealSnow: number) : Rating[] => {
  return [{
    name: 'Brno',
    latitude: 49.1951,
    longitude: 16.6068,
    value: 1.4,
  },
  {
    name: 'Praha',
    latitude: 50.0755,
    longitude: 14.4378,
    value: 9.8,
  }];
};

export default getRatings;
