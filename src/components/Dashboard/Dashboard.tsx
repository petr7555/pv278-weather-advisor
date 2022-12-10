import React, { useEffect } from 'react';
import CzechMap from '../CzechMap/CzechMap';
import Select from '../Select';
import RangeWithIcons from '../RangeWithIcons';
import { ReactComponent as Cold } from '../../icons/cold.svg';
import { ReactComponent as Hot } from '../../icons/hot.svg';
import { ReactComponent as MostlyCloudy } from '../../icons/mostly_cloudy.svg';
import { ReactComponent as Sunny } from '../../icons/sunny.svg';
import { ReactComponent as Cloudy } from '../../icons/cloudy.svg';
import { ReactComponent as Showers } from '../../icons/showers.svg';
import { ReactComponent as SnowFlurries } from '../../icons/snow_flurries.svg';
import { ReactComponent as Snow } from '../../icons/snow.svg';
import { ReactComponent as House } from '../../icons/house.svg';
import { ReactComponent as Houses } from '../../icons/houses.svg';
import getRatings from './getRatings';
import activities from './activities';
import useUrlState from '@ahooksjs/use-url-state';
import rangeConfig from './rangeConfig';
import HintModal from '../HintModal';

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

type UrlState = Partial<{
  activity: string,
  monthIdx: number,
  idealTemperature: number,
  idealSunshine: number,
  idealPrecipitation: number,
  idealSnow: number,
  stationsCount: number | 'all',
  ratingValue: number,
}>;

const Dashboard = () => {
  const [state, setState] = useUrlState<UrlState>({
    activity: undefined,
    monthIdx: undefined,
    idealTemperature: undefined,
    idealSunshine: undefined,
    idealPrecipitation: undefined,
    idealSnow: undefined,
    stationsCount: undefined,
    ratingValue: undefined,
  });
  
  useEffect(() => setState({
    idealTemperature: rangeConfig.temperature.default,
    idealSunshine: rangeConfig.sunshine.default,
    idealPrecipitation: rangeConfig.precipitation.default,
    idealSnow: rangeConfig.snow.default,
    stationsCount: rangeConfig.stations.default,
  }), [setState]);

  const ratings = (state.activity !== undefined && state.monthIdx !== undefined) ?
    getRatings(state.monthIdx, state.idealTemperature, state.idealSunshine, state.idealPrecipitation, state.idealSnow, state.stationsCount) : [];

  const onActivityChange = (value: string) => {
    const activity = activities.find(activity => activity.name === value);
    if (activity) {
      setState({
        ...state,
        activity: activity.name,
        idealTemperature: activity.idealTemperature,
        idealSunshine: activity.idealSunshine,
        idealPrecipitation: activity.idealPrecipitation,
        idealSnow: activity.idealSnow,
      });
    }
  };

  const onMonthChange = (value: string) => {
    setState({
      ...state,
      monthIdx: months.indexOf(value)
    });
  };

  const { activity, idealTemperature, idealSunshine, idealPrecipitation, idealSnow, stationsCount } = state;

  const setIdealTemperature = (value: number) => {
    setState({
      ...state,
      activity: 'Custom',
      idealTemperature: value,
    });
  };
  const setIdealSunshine = (value: number) => {
    setState({
      ...state,
      activity: 'Custom',
      idealSunshine: value,
    });
  };
  const setIdealPrecipitation = (value: number) => {
    setState({
      ...state,
      activity: 'Custom',
      idealPrecipitation: value,
    });
  };
  const setIdealSnow = (value: number) => {
    setState({
      ...state,
      activity: 'Custom',
      idealSnow: value,
    });
  };
  const setStationsCount = (value: number) => {
    setState({
      ...state,
      activity: activity,
      stationsCount: value === rangeConfig.stations.max ? 'all' : value,
    });
  };

  return (
    <div className={'flex flex-col lg:flex-row justify-items-center items-center h-full'}>
      <div className={'my-10 w-full max-h-4/5'}>
        <CzechMap ratings={ratings}/>
      </div>
      <div className={'flex flex-col w-full max-w-[500px]'}>
        <div className={'flex-1 w-full items-center flex flex-col'}>
          <HintModal/>
          <Select initialOption={'What would you like to do?'}
            options={activities.map(activity => activity.name)}
            value={activity || 'What would you like to do?'} onChange={onActivityChange}/>
          <Select initialOption={'When would you like to go?'} options={months}
            value={state.monthIdx ? months[state.monthIdx] : 'When would you like to go?'}
            onChange={onMonthChange}
            className={'mt-4 mb-4'}/>
        </div>
        <div className={'flex-1 w-full items-center flex flex-col gap-3 px-1 select-none'}>
          <RangeWithIcons {...rangeConfig.temperature} value={idealTemperature} leftIcon={Cold} rightIcon={Hot}
            unit="°C" dataTip={'Average air temperature in selected month.'}
            onChange={setIdealTemperature}/>
          <RangeWithIcons {...rangeConfig.sunshine} value={idealSunshine} leftIcon={MostlyCloudy}
            rightIcon={Sunny} unit={'hours / day'}
            dataTip={'Average hours of sunshine per day in selected month.'}
            onChange={setIdealSunshine}/>
          <RangeWithIcons {...rangeConfig.precipitation} value={idealPrecipitation} leftIcon={Cloudy}
            rightIcon={Showers} unit={'mm / day'}
            dataTip={'Average daily precipitation in millimeters in selected month.'}
            onChange={setIdealPrecipitation}/>
          <RangeWithIcons {...rangeConfig.snow} value={idealSnow} leftIcon={SnowFlurries}
            rightIcon={Snow} unit={'cm'}
            dataTip={'Average total snow cover height in centimeters in selected month.'}
            onChange={setIdealSnow}/>
          <RangeWithIcons {...rangeConfig.stations} value={stationsCount} maxTickSuffix={'+'}
            leftIcon={House} leftIconSize={'2.2rem'}
            rightIcon={Houses} unit={''}
            dataTip={'Number of best results to show.'}
            onChange={setStationsCount}
            inputClassName={'range-secondary'}/>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
