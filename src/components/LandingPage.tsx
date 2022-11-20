import React, { useEffect, useState } from 'react';
import { animated, useTransition } from 'react-spring';
import { ReactComponent as Logo } from '../icons/weather.svg';
import { ReactComponent as Lightning } from '../icons/lightning.svg';
import LoginButton from './LoginButton';

type Item = {
  x: number;
  y: number;
}

const getRandomInRange = (min: number, max: number) => {
  return Math.random() * (max - min) + min;
};

const generateLightning = (): Item => {
  const halfWidth = window.innerWidth / 2;
  const halfHeight = window.innerHeight / 2;
  const xOffset = 50;
  return {
    x: getRandomInRange(-(halfWidth - xOffset), halfWidth - xOffset),
    y: getRandomInRange(0, halfHeight),
  };
};

const DURATION = 1000;
const TIME_PER_LIGHTNING = 100;

const LandingPage = () => {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setItems(items => [...items, generateLightning()]);

      setTimeout(() => {
        setItems(items => items.slice(1));
      }, DURATION);

    }, TIME_PER_LIGHTNING);

    return () => clearInterval(interval);
  }, []);

  const transition = useTransition(items, {
    from: {
      x: 0,
      y: 0,
      opacity: 1,
    },
    enter: (item: Item) => (next) => (
      next({
        x: item.x,
        y: item.y,
        opacity: 0,
        config: { duration: DURATION }
      })),
  });

  const AnimatedLightning = animated(Lightning);

  return (
    <div className="hero min-h-screen bg-top" style={{ backgroundImage: 'url("/landing_page_background.avif")' }}>
      <div className="hero-content text-center text-neutral-content -mt-32">
        <div className="max-w-lg">
          <div className={'w-1/2 h-1/2 mx-auto relative'}>
            {transition((style, item) => {
              return <AnimatedLightning
                className="-z-10 w-10 h-10 absolute top-2/3 left-1/2"
                style={{
                  translateX: '-50%',
                  ...style,
                  opacity: style.opacity.to(o => 1 - (1 - o) ** 2),
                }}
              />;
            })}
            <Logo/>
          </div>
          <h1 className="mb-5 text-6xl font-bold">Weather Advisor</h1>
          <p className="mb-5">Plan the vacation of your dreams! We’ll give you the best locations to perform an activity
            of your choice considering the optimal weather conditions.</p>
          <LoginButton/>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
