import locations from '../../data/locations.json';

export type Rating = {
    name: string;
    latitude: number;
    longitude: number;
    value: number;
}

// TODO implement
const getRatings = (monthIdx: number, idealTemperature: number, idealSunshine: number, idealPrecipitation: number, idealSnow: number) : Rating[] => {
  return Object.values(locations).map(location => ({
    name: location.name,
    latitude: location.latitude,
    longitude: location.longitude,
    value: 5,
  }));
};

export default getRatings;
