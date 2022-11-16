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

const getRatings = (monthIdx: number, idealTemperature: number, idealSunshine: number, idealPrecipitation: number, idealSnow: number): Rating[] => {
  // TODO remove one we have edge values for all stats based on all regions 
  const minTemperature = Math.min(...Object.values(locations).map(location => Math.min(...location.temperature)));
  const maxTemperature = Math.max(...Object.values(locations).map(location => Math.max(...location.temperature)));
  const minSunshine = Math.min(...Object.values(locations).map(location => Math.min(...location.sunshine)));
  const maxSunshine = Math.max(...Object.values(locations).map(location => Math.max(...location.sunshine)));
  const minPrecipitation = Math.min(...Object.values(locations).map(location => Math.min(...location.precipitation)));
  const maxPrecipitation = Math.max(...Object.values(locations).map(location => Math.max(...location.precipitation)));
  const minSnow = Math.min(...Object.values(locations).map(location => Math.min(...location.snow)));
  const maxSnow = Math.max(...Object.values(locations).map(location => Math.max(...location.snow)));
  console.log("temperature range", minTemperature, maxTemperature);
  console.log("sunshine range", minSunshine, maxSunshine);
  console.log("precipitation range", minPrecipitation, maxPrecipitation);
  console.log("snow range", minSnow, maxSnow);
  
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

  return Object.values(locations).map((location, idx) => {
    return ({
      id: location.id,
      name: location.name,
      latitude: location.latitude,
      longitude: location.longitude,
      value: roundTo(normalize(errors[idx], minError, maxError), 1),
    });
  });
};

export default getRatings;
