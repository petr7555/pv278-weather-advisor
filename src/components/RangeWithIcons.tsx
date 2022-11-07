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

  const iconSize = '2.5rem';

  return (
    <div className={'flex flex-1 justify-center min-w-[340px] md:min-w-[500px]'}>
      <LeftIcon style={{
        width: iconSize,
        height: iconSize
      }}/>
      <Range className="flex-1 mt-2 mx-2" min={min} max={max} step={step} value={value} onChange={onChange}/>
      <RightIcon style={{
        width: iconSize,
        height: iconSize
      }}/>
    </div>
  );
};

export default RangeWithIcons;
