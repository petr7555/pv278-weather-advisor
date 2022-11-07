export type Activity = {
    name: string;
    idealTemperature: number;
    idealSunshine: number;
    idealPrecipitation: number;
    idealSnow: number;
}

// TODO revise ideal values
// TODO values must not exceed selector range
const activities: Activity[] = [
  {
    name: 'Cross-country skiing',
    idealTemperature: -2,
    idealSunshine: 10,
    idealPrecipitation: 0,
    idealSnow: 80,
  },
  {
    name: 'Cycling',
    idealTemperature: 21,
    idealSunshine: 14,
    idealPrecipitation: 0,
    idealSnow: 0,
  },
  {
    name: 'Hiking',
    idealTemperature: 22,
    idealSunshine: 14,
    idealPrecipitation: 0,
    idealSnow: 0,
  },
  {
    name: 'Kayaking',
    idealTemperature: 27,
    idealSunshine: 14,
    idealPrecipitation: 0,
    idealSnow: 0,
  },
  {
    name: 'Running',
    idealTemperature: 20,
    idealSunshine: 10,
    idealPrecipitation: 0,
    idealSnow: 0,
  },
  {
    name: 'Skiing',
    idealTemperature: -3,
    idealSunshine: 10,
    idealPrecipitation: 0,
    idealSnow: 100,
  },
  {
    name: 'Snorkeling',
    idealTemperature: 30,
    idealSunshine: 15,
    idealPrecipitation: 0,
    idealSnow: 0,
  },
  {
    name: 'Swimming',
    idealTemperature: 25,
    idealSunshine: 15,
    idealPrecipitation: 0,
    idealSnow: 0,
  },
  {
    name: 'Custom',
    idealTemperature: 0,
    idealSunshine: 0,
    idealPrecipitation: 0,
    idealSnow: 0,
  }
];

export default activities;
