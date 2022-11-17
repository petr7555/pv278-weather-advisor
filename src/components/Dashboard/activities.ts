import rangeConfig from './rangeConfig';

export type Activity = {
    name: string;
    idealTemperature: number;
    idealSunshine: number;
    idealPrecipitation: number;
    idealSnow: number;
}


const checkActivities = (activities: Activity[]) => {
  const checkStat = (idealValue: number, stat: 'temperature' | 'sunshine' | 'precipitation' | 'snow') => {
    const { min, max, step } = rangeConfig[stat];
    if (idealValue < min || idealValue > max) {
      throw new Error(`ideal ${stat} value ${idealValue} out of range [${min}, ${max}]`);
    }
    if (idealValue % step !== 0) {
      throw new Error(`ideal ${stat} value ${idealValue} is not a multiple of step ${step}`);
    }
  };
  activities.forEach(activity => {
    checkStat(activity.idealTemperature, 'temperature');
    checkStat(activity.idealSunshine, 'sunshine');
    checkStat(activity.idealPrecipitation, 'precipitation');
    checkStat(activity.idealSnow, 'snow');
  });
};

const activities: Activity[] = [
  {
    name: 'Cross-country skiing',
    idealTemperature: -3,
    idealSunshine: 6,
    idealPrecipitation: 0,
    idealSnow: 80,
  },
  {
    name: 'Cycling',
    idealTemperature: 21,
    idealSunshine: 10,
    idealPrecipitation: 0,
    idealSnow: 0,
  },
  {
    name: 'Hiking',
    idealTemperature: 24,
    idealSunshine: 9,
    idealPrecipitation: 20,
    idealSnow: 0,
  },
  {
    name: 'Kayaking',
    idealTemperature: 21,
    idealSunshine: 9,
    idealPrecipitation: 0,
    idealSnow: 0,
  },
  {
    name: 'Running',
    idealTemperature: 21,
    idealSunshine: 8,
    idealPrecipitation: 0,
    idealSnow: 0,
  },
  {
    name: 'Skiing',
    idealTemperature: -3,
    idealSunshine: 6,
    idealPrecipitation: 0,
    idealSnow: 100,
  },
  {
    name: 'Snorkeling',
    idealTemperature: 24,
    idealSunshine: 10,
    idealPrecipitation: 0,
    idealSnow: 0,
  },
  {
    name: 'Swimming',
    idealTemperature: 24,
    idealSunshine: 9,
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

checkActivities(activities);  

export default activities;
