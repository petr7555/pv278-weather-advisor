import React from 'react';
import CzechMap from './components/CzechMap/CzechMap';
import LoginButton from './components/LoginButton';
import LogoutButton from './components/LogoutButton';
import Range from './components/Range';
import Profile from './components/Profile';
import Select from './components/Select';
import Table from './components/Table';

const App = () => {
  return (
    <div >
      <button className="btn">Hello daisyUI</button>
      <LoginButton/>
      <LogoutButton/>
      <Profile/>
      <CzechMap/>
      <Select/>
      <Range min={-10} max={30} initialValue={5} step={5}/>
      <Range min={0} max={10} initialValue={5} step={1}/>
      <Range min={0} max={10} initialValue={5} step={1}/>
      <Range min={0} max={10} initialValue={5} step={1}/>
      <Table/>
    </div>
  );
};

export default App;
