import React, { useEffect, useState } from 'react';
import { animated, useTransition } from 'react-spring';
import { v4 as uuidv4 } from 'uuid';
import { ReactComponent as Logo } from '../icons/weather.svg';
import { ReactComponent as Lightning } from '../icons/lightning.svg';
import LoginButton from './LoginButton';

type Item = {
  key: string;
  x: number;
  y: number;
  duration: number;
}

const getRandomInRange = (min: number, max: number) => {
  return Math.random() * (max - min) + min;
};

const VELOCITY = 0.4;
const TIME_PER_LIGHTNING = 50;

const generateLightning = (): Item => {
  const halfWidth = window.innerWidth / 2;
  const xOffset = 50;
  const x = getRandomInRange(-(halfWidth - xOffset), halfWidth - xOffset);
  const y = getRandomInRange(0, window.innerHeight * 3/5);
  const distance = Math.sqrt(x * x + y * y);
  const duration = distance / getRandomInRange(VELOCITY * 0.8, VELOCITY * 1.2);
  const key = uuidv4();
  return {key, x, y, duration};
};


const LandingPage = () => {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newItem = generateLightning();
      
      setItems(items => [...items, newItem]);

      setTimeout(() => {
        setItems(items => items.filter(item => item.key !== newItem.key));
      }, newItem.duration);

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
        config: { duration: item.duration },
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
