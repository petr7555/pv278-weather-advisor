import React, { FC, FunctionComponent, SVGProps } from 'react';
import Range from './Range';

type Props = {
    min: number;
    max: number;
    initialValue: number;
    step?: number;
    className?: string;
    leftIcon: FunctionComponent<SVGProps<SVGSVGElement> & { title?: string | undefined; }>;
    rightIcon: FunctionComponent<SVGProps<SVGSVGElement> & { title?: string | undefined; }>;
}
const RangeWithIcons: FC<Props> = ({
  min, max,
  initialValue, step = 1,
  leftIcon: LeftIcon, rightIcon: RightIcon
}) => {

  const iconSize = 10;
  
  return (
    <div className={'flex'}>
      <LeftIcon className={`w-${iconSize} h-${iconSize}`}/>
      <Range className="flex-1 mt-2 mx-2" min={min} max={max} initialValue={initialValue} step={step}/>
      <RightIcon className={`w-${iconSize} h-${iconSize}`}/>
    </div>
  );
};

export default RangeWithIcons;
