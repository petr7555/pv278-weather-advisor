import React from 'react';
import CzechMap from './CzechMap/CzechMap';
import Select from './Select';
import { ReactComponent as Cold } from '../icons/cold.svg';
import { ReactComponent as Hot } from '../icons/hot.svg';
import { ReactComponent as MostlyCloudy } from '../icons/mostly_cloudy.svg';
import { ReactComponent as Sunny } from '../icons/sunny.svg';
import { ReactComponent as Cloudy } from '../icons/cloudy.svg';
import { ReactComponent as Showers } from '../icons/showers.svg';
import { ReactComponent as SnowFlurries } from '../icons/snow_flurries.svg';
import { ReactComponent as Snow } from '../icons/snow.svg';
import RangeWithIcons from './RangeWithIcons';

const Dashboard = () => {
  return (
    <div className={'flex'}>
      <div className={'flex-1'}>
        <CzechMap/>
      </div>
      <div className={'flex-1'}>
        <Select initialOption={'What would you like to do?'} options={[
          'Cycling',
          'Running',
          'Hiking',
          'Snorkeling',
          'Kayaking',
          'Skiing',
          'Cross-country skiing',
          'Honeymoon',
        ]}/>
        <Select initialOption={'When would you like to go?'} options={
          ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        }/>
        <RangeWithIcons min={-10} max={30} initialValue={5} step={5} leftIcon={Cold} rightIcon={Hot}/>
        <RangeWithIcons min={-10} max={30} initialValue={5} step={5} leftIcon={MostlyCloudy} rightIcon={Sunny}/>
        <RangeWithIcons min={-10} max={30} initialValue={5} step={5} leftIcon={Cloudy} rightIcon={Showers}/>
        <RangeWithIcons min={-10} max={30} initialValue={5} step={5} leftIcon={SnowFlurries} rightIcon={Snow}/>
      </div>
    </div>
  );
};

export default Dashboard;
