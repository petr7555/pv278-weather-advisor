import locations from '../../data/locations.json';

export type Rating = {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  value: number;
}

const error = (value: number, ideal: number) => {
  return Math.pow(value - ideal, 2);
};

const normalize = (value: number, min: number, max: number) => {
  const range = max - min;
  if (range === 0) {
    return 0;
  }
  return (value - min) / range * 10;
};

const roundTo = (value: number, decimals: number) => {
  return Number(Math.round(Number(value + 'e' + decimals)) + 'e-' + decimals);
};

const getRatings = (monthIdx: number, idealTemperature: number, idealSunshine: number, idealPrecipitation: number, idealSnow: number, stationsCount: number | 'all'): Rating[] => {
  const temperatureErrors = Object.values(locations).map(location => error(location.temperature[monthIdx], idealTemperature));
  const sunshineErrors = Object.values(locations).map(location => error(location.sunshine[monthIdx], idealSunshine));
  const precipitationErrors = Object.values(locations).map(location => error(location.precipitation[monthIdx], idealPrecipitation));
  const snowErrors = Object.values(locations).map(location => error(location.snow[monthIdx], idealSnow));

  const minTemperatureError = Math.min(...temperatureErrors);
  const maxTemperatureError = Math.max(...temperatureErrors);
  const minSunshineError = Math.min(...sunshineErrors);
  const maxSunshineError = Math.max(...sunshineErrors);
  const minPrecipitationError = Math.min(...precipitationErrors);
  const maxPrecipitationError = Math.max(...precipitationErrors);
  const minSnowError = Math.min(...snowErrors);
  const maxSnowError = Math.max(...snowErrors);

  const errors = Object.values(locations).map((location, idx) => {
    const temperatureError = normalize(temperatureErrors[idx], minTemperatureError, maxTemperatureError);
    const sunshineError = normalize(sunshineErrors[idx], minSunshineError, maxSunshineError);
    const precipitationError = normalize(precipitationErrors[idx], minPrecipitationError, maxPrecipitationError);
    const snowError = normalize(snowErrors[idx], minSnowError, maxSnowError);

    return temperatureError + sunshineError + precipitationError + snowError;
  });

  const minError = Math.min(...errors);
  const maxError = Math.max(...errors);

  const ratings = Object.values(locations).map((location, idx) => {
    return ({
      id: location.id,
      name: location.name,
      latitude: location.latitude,
      longitude: location.longitude,
      value: 10 - roundTo(normalize(errors[idx], minError, maxError), 1),
    });
  });

  return ratings.sort((a, b) => b.value - a.value)
    .slice(0, stationsCount === 'all' ? ratings.length : stationsCount)
    .sort((a, b) => a.id.localeCompare(b.id));
};

export default getRatings;
