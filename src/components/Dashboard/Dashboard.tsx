import React from 'react';
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
import getRatings from './getRatings';
import activities from './activities';
import useUrlState from '@ahooksjs/use-url-state';

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

type UrlState = Partial<{
  activity: string,
  monthIdx: number,
  idealTemperature: number,
  idealSunshine: number,
  idealPrecipitation: number,
  idealSnow: number,
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
    ratingValue: undefined,
  });
  
  const ratings = (state.monthIdx !== undefined) ?
    getRatings(state.monthIdx, state.idealTemperature, state.idealSunshine, state.idealPrecipitation, state.idealSnow) : [];

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

  const { activity, idealTemperature, idealSunshine, idealPrecipitation, idealSnow } = state;
  
  const setIdealTemperature = (value: number) => {
    setState({
      ...state,
      activity: "Custom",
      idealTemperature: value,
    });
  };
  const setIdealSunshine = (value: number) => {
    setState({
      ...state,
      activity: "Custom",
      idealSunshine: value,
    });
  };
  const setIdealPrecipitation = (value: number) => {
    setState({
      ...state,
      activity: "Custom",
      idealPrecipitation: value,
    });
  };
  const setIdealSnow = (value: number) => {
    setState({
      ...state,
      activity: "Custom",
      idealSnow: value,
    });
  };

  return (
    <div className={'flex flex-col lg:flex-row justify-items-center items-center h-full'}>
      <div className={'my-10 w-full max-h-4/5'}>
        <CzechMap ratings={ratings}/>
      </div>
      <div className={'flex flex-col'}>
        <div className={'flex-1 w-full items-center flex flex-col'}>
          <Select initialOption={'What would you like to do?'}
            options={activities.map(activity => activity.name)}
            value={activity || 'What would you like to do?'} onChange={onActivityChange}/>
          <Select initialOption={'When would you like to go?'} options={months}
            value={state.monthIdx ? months[state.monthIdx] : 'When would you like to go?'}
            onChange={onMonthChange}
            className={'mt-4 mb-4'}/>
        </div>
        <div className={'flex-1 w-full items-center flex flex-col gap-3'}>
          {/* TODO find edge values */}
          {/* TODO explain what values mean */}
          {/* TODO In °C */}
          <RangeWithIcons min={-10} max={30} step={5} value={idealTemperature} leftIcon={Cold} rightIcon={Hot}
            onChange={setIdealTemperature}/>
          {/* TODO In hours per month -> change to hours per day */}
          <RangeWithIcons min={0} max={10} value={idealSunshine} step={1} leftIcon={MostlyCloudy}
            rightIcon={Sunny}
            onChange={setIdealSunshine}/>
          {/* TODO Daily precipitation in mm averaged over month */}
          <RangeWithIcons min={0} max={140} value={idealPrecipitation} step={20} leftIcon={Cloudy}
            rightIcon={Showers}
            onChange={setIdealPrecipitation}/>
          {/* TODO In cm */}
          <RangeWithIcons min={0} max={90} value={idealSnow} step={10} leftIcon={SnowFlurries}
            rightIcon={Snow}
            onChange={setIdealSnow}/>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
