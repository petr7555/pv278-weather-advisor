import React from 'react';
import CzechMap from './CzechMap/CzechMap';
import Select from './Select';
import Range from './Range';
import Header from './Header';

const Dashboard = () => {
  return (
    <div>
      <Header/>
      <CzechMap/>
      <Select initialOption={"What would you like to do?"} options={[
        "Cycling",
        "Running",
        "Hiking",
        "Snorkeling",
        "Kayaking",
        "Skiing",
        "Cross-country skiing",
        "Honeymoon",
      ]}/>
      <Select initialOption={"Month"} options={
        ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
      }/>
      <Range min={-10} max={30} initialValue={5} step={5}/>
      <Range min={0} max={10} initialValue={5} step={1}/>
      <Range min={0} max={10} initialValue={5} step={1}/>
      <Range min={0} max={10} initialValue={5} step={1}/>
    </div>
  );
};

export default Dashboard;
