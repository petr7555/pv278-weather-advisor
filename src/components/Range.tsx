import React, { FC, useState } from 'react';
import clsx from 'clsx';

type Props = {
    min: number;
    max: number;
    initialValue: number;
    step?: number;
    className?: string;
}
const Range: FC<Props> = ({ min, max, initialValue, step = 1, className }) => {
  const [value, setValue] = useState(initialValue);

  const onChange = (event: any) => {
    setValue(event.target.value);
  };

  return (
    <div className={clsx("max-w-xs", className)}>
      <input type="range" className="range range-sm range-primary" step={step} min={min} max={max} value={value}
        onChange={onChange}/>
      <div className="w-max-xs flex justify-between text-xs px-1 ">
        {
          Array.from({ length: (max - min) / step + 1 }, (_, i) => i * step + min).map((tick) => (
            <span key={tick}>{tick}</span>
          ))
        }
      </div>
    </div>
  );
};

export default Range;
