import React, { FC } from 'react';
import clsx from 'clsx';

type Props = {
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (value: number) => void;
  className?: string;
  rangeStyle?: string;
  unspecifiedMax?: boolean;
}
const Range: FC<Props> = ({
  min,
  max,
  step,
  value,
  className,
  rangeStyle = 'range-primary',
  unspecifiedMax = false,
  onChange
}) => {
  const onSelectChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(Number(event.target.value));
  };

  return (
    <div className={clsx('w-full', className)}>
      <input type="range" className={clsx('range range-sm', rangeStyle)} step={step} min={min} max={max} value={value}
        onChange={onSelectChange}/>
      <div className="w-max-xs flex justify-between text-xs px-1 ">
        {
          unspecifiedMax ?
            Array.from({ length: (max - min) / step }, (_, i) => (i * step + min).toString())
              .concat(max.toString() + '+')
              .map((tick) => (
                <span key={tick}>{tick}</span>
              )) :
            Array.from({ length: (max - min) / step + 1 }, (_, i) => i * step + min)
              .map((tick) => (
                <span key={tick}>{tick}</span>
              ))
        }
      </div>
    </div>
  );
};

export default Range;
