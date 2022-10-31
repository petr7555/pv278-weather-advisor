import { ReactComponent as StarWhite } from '../icons/star_white.svg';
import { ReactComponent as StarGold } from '../icons/star_gold.svg';
import { FC } from 'react';

type Props = {
    value: number;
}
const Stars : FC<Props>= ({ value }) => {
  const iconSize = "2.5rem";
  
  return (
    <div className="flex justify-center gap-x-1">
      {Array.from({ length: value }).map((_, i) => <StarGold key={i} style={{width: iconSize, height: iconSize}}/>)}
      {Array.from({ length: 5 - value }).map((_, i) => <StarWhite key={i}  style={{width: iconSize, height: iconSize}}/>)}
    </div>);
}

export default Stars;
