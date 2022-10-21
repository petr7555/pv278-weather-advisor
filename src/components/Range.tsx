import React, { FC, useState } from 'react';

type Props = {
    min: number;
    max: number;
    initialValue: number;
    step?: number;
}
const Range: FC<Props> = ({ min, max, initialValue, step = 1 }) => {
  const [value, setValue] = useState(initialValue);

  const onChange = (event: any) => {
    setValue(event.target.value);
  };

  return (
    <div className="max-w-xs ml-10 mt-10">
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
