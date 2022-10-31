import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import LandingPage from './components/LandingPage';
import { BrowserRouter } from 'react-router-dom';
import RoutesSwitch from './components/RoutesSwitch';
import Layout from './components/Layout';
import StateContext from './stateContext';

const storage = window.localStorage;

const App = () => {
  const [activity, setActivity] = useState<string | undefined>(storage.getItem('activity') || undefined);
  const [monthIdx, setMonthIdx] = useState<number | undefined>(Number(storage.getItem('monthIdx')) || undefined);
  const [idealTemperature, setIdealTemperature] = useState(Number(storage.getItem('idealTemperature')) || 5);
  const [idealSunshine, setIdealSunshine] = useState(Number(storage.getItem('idealSunshine')) || 5);
  const [idealPrecipitation, setIdealPrecipitation] = useState(Number(storage.getItem('idealPrecipitation') )|| 5);
  const [idealSnow, setIdealSnow] = useState(Number(storage.getItem('idealSnow') )|| 5);
  const [ratingValue, setRatingValue] = useState(Number(storage.getItem('ratingValue') )|| 0);

  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return (
      <div className="hero min-h-screen bg-top"
        style={{ backgroundImage: 'url("/landing_page_background.jpg")' }}>
        <progress className="progress w-56 progress-primary"></progress>
      </div>
    );
  }

  return (
    isAuthenticated ? (
      <StateContext.Provider value={{
        activity,
        monthIdx,
        idealTemperature,
        idealSunshine,
        idealPrecipitation,
        idealSnow,
        ratingValue,
        setActivity: (value) => {
          storage.setItem('activity', value);
          setActivity(value);
        },
        setMonthIdx: (value) => {
          storage.setItem('monthIdx', String(value));
          setMonthIdx(value);
        },
        setIdealTemperature:(value) => {
          storage.setItem('idealTemperature', String(value));
          setIdealTemperature(value);
        },
        setIdealSunshine: (value) => {
          storage.setItem('idealSunshine', String(value));
          setIdealSunshine(value);
        },
        setIdealPrecipitation: (value) => {
          storage.setItem('idealPrecipitation', String(value));
          setIdealPrecipitation(value);
        },
        setIdealSnow: (value) => {
          storage.setItem('idealSnow', String(value));
          setIdealSnow(value);
        },
        setRatingValue: (value) => {
          storage.setItem('ratingValue', String(value));
          setRatingValue(value);
        },
      }}>
        <BrowserRouter>
          <Layout>
            <RoutesSwitch/>
          </Layout>
        </BrowserRouter>
      </StateContext.Provider>)
      : <LandingPage/>
  );
};

export default App;
