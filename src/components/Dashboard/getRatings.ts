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
  // const minTemperature = roundTo(Math.min(...Object.values(locations).map(location => Math.min(...location.temperature))), 2);
  // const maxTemperature = roundTo(Math.max(...Object.values(locations).map(location => Math.max(...location.temperature))),2);
  // const minSunshine = roundTo(Math.min(...Object.values(locations).map(location => Math.min(...location.sunshine))),2);
  // const maxSunshine = roundTo(Math.max(...Object.values(locations).map(location => Math.max(...location.sunshine))),2);
  // const minPrecipitation = roundTo(Math.min(...Object.values(locations).map(location => Math.min(...location.precipitation))),2);
  // const maxPrecipitation = roundTo(Math.max(...Object.values(locations).map(location => Math.max(...location.precipitation))),2);
  // const minSnow = roundTo(Math.min(...Object.values(locations).map(location => Math.min(...location.snow))),2);
  // const maxSnow = roundTo(Math.max(...Object.values(locations).map(location => Math.max(...location.snow))),2);
  // console.log(`Temperature range in data: [${minTemperature}, ${maxTemperature}]`);
  // console.log(`Sunshine range in data: [${minSunshine}, ${maxSunshine}]`);
  // console.log(`Precipitation range in data: [${minPrecipitation}, ${maxPrecipitation}]`);
  // console.log(`Snow range in data: [${minSnow}, ${maxSnow}]`);
  
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
