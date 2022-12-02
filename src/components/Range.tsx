import React, { FC } from 'react';
import clsx from 'clsx';

type Props = {
  min: number;
  max: number;
  step: number;
  value: number | 'all';
  maxTickSuffix?: string;
  onChange: (value: number) => void;
  className?: string;
  inputClassName?: string;
}
const Range: FC<Props> = ({
  min,
  max,
  step,
  value,
  maxTickSuffix = '',
  onChange,
  className,
  inputClassName = 'range-primary',
}) => {
  const onSelectChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(Number(event.target.value));
  };

  return (
    <div className={clsx('w-full', className)}>
      <input type="range" className={clsx('range range-sm', inputClassName)} step={step} min={min} max={max}
        value={value === 'all' ? max : value} onChange={onSelectChange}/>
      <div className="w-max-xs flex justify-between text-xs px-1 ">
        {
          Array.from({ length: (max - min) / step + 1 }, (_, i) => i * step + min).map((tick) => (
            <span key={tick}>{tick}{tick === max ? maxTickSuffix : ''}</span>
          ))
        }
      </div>
    </div>
  );
};

export default Range;
