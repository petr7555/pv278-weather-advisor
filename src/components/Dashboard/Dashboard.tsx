import React, { useContext } from 'react';
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
import StateContext from '../../stateContext';

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];


const Dashboard = () => {
  const {
    activity, monthIdx, idealTemperature, idealSunshine, idealPrecipitation, idealSnow,
    setActivity, setMonthIdx, setIdealTemperature, setIdealSunshine, setIdealPrecipitation, setIdealSnow
  } = useContext(StateContext);

  // TODO remove
  console.log('idealTemperature', idealTemperature);
  console.log('idealSunshine', idealSunshine);
  console.log('idealPrecipitation', idealPrecipitation);
  console.log('idealSnow', idealSnow);
  console.log('monthIdx', monthIdx);

  const ratings = (monthIdx !== undefined) ?
    getRatings(monthIdx, idealTemperature, idealSunshine, idealPrecipitation, idealSnow) : [];

  const onActivityChange = (value: string) => {
    const activity = activities.find(activity => activity.name === value);
    if (activity) {
      setActivity(activity.name);
      setIdealTemperature(activity.idealTemperature);
      setIdealSunshine(activity.idealSunshine);
      setIdealPrecipitation(activity.idealPrecipitation);
      setIdealSnow(activity.idealSnow);
    }
  };

  const onMonthChange = (value: string) => {
    setMonthIdx(months.indexOf(value));
  };

  return (
    <div className={'flex flex-col lg:flex-row justify-items-center items-center h-full'}>
      <div className={'my-10 w-full max-h-4/5'}>
        <CzechMap ratings={ratings}/>
      </div>
      <div className={'flex flex-col'}>
        <div className={'flex-1 w-full items-center flex flex-col'}>
          <Select initialOption={'What would you like to do?'} options={activities.map(activity => activity.name)}
            value={activity || 'What would you like to do?'} onChange={onActivityChange}/>
          <Select initialOption={'When would you like to go?'} options={months}
            value={monthIdx ? months[monthIdx] : 'When would you like to go?'} onChange={onMonthChange}
            className={"mt-4 mb-4"}/>
        </div>
        <div className={"flex-1 w-full items-center flex flex-col gap-3"}>
          {/* TODO find edge values */}
          {/* TODO explain what values mean */}
          {/* TODO In °C */}
          <RangeWithIcons min={-10} max={30} step={5} value={idealTemperature} leftIcon={Cold} rightIcon={Hot}
            onChange={setIdealTemperature}/>
          {/* TODO In hours per month -> change to hours per day */}
          <RangeWithIcons min={0} max={24} value={idealSunshine} step={2} leftIcon={MostlyCloudy}
            rightIcon={Sunny}
            onChange={setIdealSunshine}/>
          {/* TODO Daily precipitation in mm averaged over month */}
          <RangeWithIcons min={0} max={100} value={idealPrecipitation} step={10} leftIcon={Cloudy}
            rightIcon={Showers}
            onChange={setIdealPrecipitation}/>
          {/* TODO In cm */}
          <RangeWithIcons min={0} max={100} value={idealSnow} step={10} leftIcon={SnowFlurries} rightIcon={Snow}
            onChange={setIdealSnow}/>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
