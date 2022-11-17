import React from 'react';
import Table from './Table';
import { useParams } from 'react-router-dom';
import BackButton from './BackButton';
import locations from '../data/locations.json';
import useUrlState from '@ahooksjs/use-url-state';


const Location = () => {
  const { locationId } = useParams<{ locationId: string }>();
  const [{ ratingValue }] = useUrlState({
    ratingValue: 0
  });
  
  if (locationId === undefined || !(locationId in locations)) {
    return <>
      <BackButton/>
      <div className={'prose prose-sm text-center max-w-none'}>
        <h1>We are sorry, location with id '{locationId}' does not exist.</h1>
      </div>
    </>;
  }
  // @ts-ignore We checked before that locationId is in locations
  const location = locations[locationId];

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
        <h1 className={'mb-2'}>{location.name}</h1>
        <p className={"text-2xl mt-0 mb-4"}>{ratingValue} / 10</p>
        <div className={'mx-4 lg:mx-16'}>
          <Table rows={rows}/>
        </div>
      </div>
    </>
  );
};

export default Location;
