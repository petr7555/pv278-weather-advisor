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
    unit: string;
    dataTip: string;
    className?: string;
}
const RangeWithIcons: FC<Props> = ({
  min, max,
  value, step,
  leftIcon: LeftIcon, rightIcon: RightIcon,
  unit, dataTip,
  onChange
}) => {
  const iconSize = '2.5rem';
  
  return (
    <div className={'flex flex-1 justify-center w-full'}>
      <div className={`tooltip tooltip-secondary tooltip-right z-10
      before:text-neutral before:w-48 md:before:w-max before:content-[attr(data-tip)]`}
      data-tip={dataTip}>
        <div className={'flex flex-col items-center w-20'}>
          <LeftIcon style={{
            width: iconSize,
            height: iconSize,
          }}/>
          <div className={'text-sm text-neutral'}>{unit}</div>
        </div>
      </div>
      <Range className="flex-1 mt-2 mx-2" min={min} max={max} step={step} value={value} onChange={onChange}/>
      <RightIcon style={{
        width: iconSize,
        height: iconSize
      }}/>
    </div>
  );
};

export default RangeWithIcons;
