import React, { FC, FunctionComponent, SVGProps } from 'react';
import Range from './Range';

type Props = {
    min: number;
    max: number;
    step: number;
    value: number;
    onChange: (value: number) => void;
    leftIcon: FunctionComponent<SVGProps<SVGSVGElement> & { title?: string | undefined; }>;
    rightIcon: FunctionComponent<SVGProps<SVGSVGElement> & { title?: string | undefined; }>;
    className?: string;
}
const RangeWithIcons: FC<Props> = ({
  min, max,
  value, step,
  leftIcon: LeftIcon, rightIcon: RightIcon,
  onChange
}) => {

  const iconSize = 10;
  
  return (
    <div className={'flex'}>
      <LeftIcon className={`w-${iconSize} h-${iconSize}`}/>
      <Range className="flex-1 mt-2 mx-2" min={min} max={max} step={step} value={value} onChange={onChange}/>
      <RightIcon className={`w-${iconSize} h-${iconSize}`}/>
    </div>
  );
};

export default RangeWithIcons;
