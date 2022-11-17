import React from 'react';
import logo from '../icons/weather.svg';
import LoginButton from './LoginButton';

const LandingPage = () => {
  return (
    <div className="hero min-h-screen bg-top" style={{ backgroundImage: 'url("/landing_page_background.avif")'}}>
      <div className="hero-content text-center text-neutral-content -mt-32" >
        <div className="max-w-lg">
          <img src={logo} className="w-1/2 h-1/2 mx-auto" alt="sun partly hidden behind a cloud" />
          <h1 className="mb-5 text-6xl font-bold">Weather Advisor</h1>
          <p className="mb-5">Plan the vacation of your dreams! We’ll give you the best locations to perform an activity of your choice considering the optimal weather conditions.</p>
          <LoginButton/>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
