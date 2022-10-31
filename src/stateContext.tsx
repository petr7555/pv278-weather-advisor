import React from 'react';

type StateContextType = {
    activity?: string;
    monthIdx?: number;
    idealTemperature: number;
    idealSunshine: number;
    idealPrecipitation: number;
    idealSnow: number;
    ratingValue: number;
    setActivity: (value: string) => void;
    setMonthIdx: (value: number) => void;
    setIdealTemperature: (value: number) => void;
    setIdealSunshine: (value: number) => void;
    setIdealPrecipitation: (value: number) => void;
    setIdealSnow: (value: number) => void;
    setRatingValue: (value: number) => void;
}

export const defaultStateContextValue: StateContextType = {
  activity: undefined,
  monthIdx: undefined,
  idealTemperature: 0,
  idealSunshine: 0,
  idealPrecipitation: 0,
  idealSnow: 0,
  ratingValue: 0,
  setActivity: () => {},
  setMonthIdx: () => {},
  setIdealTemperature: () => {},
  setIdealSunshine: () => {},
  setIdealPrecipitation: () => {},
  setIdealSnow: () => {},
  setRatingValue: () => {},
};

const StateContext = React.createContext<StateContextType>(defaultStateContextValue);

export default StateContext;
