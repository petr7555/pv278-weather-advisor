export type Activity = {
    name: string;
    idealTemperature: number;
    idealSunshine: number;
    idealPrecipitation: number;
    idealSnow: number;
}

// TODO revise ideal values
const activities: Activity[] = [
  {
    name: 'Cycling',
    idealTemperature: 25,
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
    name: 'Hiking',
    idealTemperature: 22,
    idealSunshine: 14,
    idealPrecipitation: 0,
    idealSnow: 0,
  },
  {
    name: 'Snorkeling',
    idealTemperature: 35,
    idealSunshine: 15,
    idealPrecipitation: 0,
    idealSnow: 0,
  },
  {
    name: 'Kayaking',
    idealTemperature: 23,
    idealSunshine: 14,
    idealPrecipitation: 10,
    idealSnow: 0,
  },
  {
    name: 'Skiing',
    idealTemperature: -5,
    idealSunshine: 10,
    idealPrecipitation: 0,
    idealSnow: 100,
  },
  {
    name: 'Cross-country skiing',
    idealTemperature: 0,
    idealSunshine: 10,
    idealPrecipitation: 0,
    idealSnow: 80,
  },
  {
    name: 'Honeymoon',
    idealTemperature: 25,
    idealSunshine: 15,
    idealPrecipitation: 0,
    idealSnow: 0,
  }
];

export default activities;
