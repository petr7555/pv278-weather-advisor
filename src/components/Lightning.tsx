import React, { useEffect, useState } from 'react';
import { animated, useTransition } from 'react-spring';
import { v4 as uuidv4 } from 'uuid';
import { ReactComponent as LightningIcon } from '../icons/lightning.svg';

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
const TIME_PER_LIGHTNING = 100;

const generateLightning = (): Item => {
  const halfWidth = window.innerWidth / 2;
  const xOffset = 80;
  const x = getRandomInRange(-(halfWidth - xOffset), halfWidth - xOffset);
  const y = getRandomInRange(0, window.innerHeight / 2);
  const distance = Math.sqrt(x * x + y * y);
  const duration = distance / getRandomInRange(VELOCITY * 0.8, VELOCITY * 1.2);
  const key = uuidv4();
  return { key, x, y, duration };
};

const Lightning = () => {
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

  const AnimatedLightning = animated(LightningIcon);

  return transition((style) => {
    return <AnimatedLightning
      className="-z-10 w-10 h-10 absolute top-2/3 left-1/2"
      style={{
        translateX: '-50%',
        ...style,
        opacity: style.opacity.to(o => 1 - (1 - o) ** 2),
      }}
    />;
  });
};

export default Lightning;
