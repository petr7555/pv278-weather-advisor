import React from 'react';
import CzechMap from './components/CzechMap/CzechMap';
import LoginButton from './components/LoginButton';
import LogoutButton from './components/LogoutButton';
import Profile from './components/Profile';
 
const App = () => (
  <>
    <button className="btn">Hello daisyUI</button>
    <LoginButton/>
    <LogoutButton/>
    <Profile/>
    <CzechMap/>
  </>
);

export default App;
