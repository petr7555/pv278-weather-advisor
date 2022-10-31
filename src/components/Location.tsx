import React, { useContext } from 'react';
import Table from './Table';
import { useParams } from 'react-router-dom';
import Stars from './Stars';
import BackButton from './BackButton';
import locations from '../data/locations.json';
import StateContext from '../stateContext';


const Location = () => {
  const { ratingValue } = useContext(StateContext);
  const { locationName } = useParams<{ locationName: string }>();

  if (locationName === undefined || !(locationName in locations)) {
    return <>
      <BackButton/>
      <div className={'prose prose-sm text-center max-w-none'}>
        <h1>We are sorry, location '{locationName}' does not exist.</h1>
      </div>
    </>;
  }
  // @ts-ignore We checked before that locationName is in locations
  const location = locations[locationName];

  const rows = Array.from({ length: 12 }, (_, i) => ({
    month: i + 1,
    temperature: location.temperature[i],
    sunshine: location.sunshine[i],
    precipitation: location.precipitation[i],
    snow: location.snow[i],
  }));

  return (
    <>
      <BackButton/>
      <div className={'prose prose-xl text-center max-w-none'}>
        <h1 className={'mb-2'}>{locationName}</h1>
        <Stars value={Math.round(ratingValue / 2)}/>
        <div className={'mx-4 lg:mx-16 mt-8'}>
          <Table rows={rows}/>
        </div>
      </div>
    </>
  );
};

export default Location;
