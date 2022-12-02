import React, { FC, FunctionComponent, SVGProps } from 'react';
import Range from './Range';

type Props = {
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (value: number) => void;
  leftIcon: FunctionComponent<SVGProps<SVGSVGElement> & { title?: string | undefined; }>;
  leftIconSize?: string;
  rightIcon: FunctionComponent<SVGProps<SVGSVGElement> & { title?: string | undefined; }>;
  rightIconSize?: string;
  unit: string;
  dataTip: string;
  unspecifiedMax?: boolean;
  className?: string;
  range?: string;
}
const RangeWithIcons: FC<Props> = ({
  min, max,
  value, step,
  leftIcon: LeftIcon, leftIconSize = '2.5rem',
  rightIcon: RightIcon, rightIconSize = '2.5rem',
  unit, dataTip,
  onChange,
  range = 'range-primary',
  unspecifiedMax = false
}) => {
  return (
    <div className={'flex flex-1 justify-center w-full'}>
      <div className={`tooltip tooltip-secondary tooltip-right z-10
      before:text-neutral before:w-48 md:before:w-max before:content-[attr(data-tip)]`}
      data-tip={dataTip}>
        <div className={'flex flex-col items-center w-20'}>
          <LeftIcon style={{
            width: leftIconSize,
            height: leftIconSize,
          }}/>
          <div className={'text-sm text-neutral'}>{unit}</div>
        </div>
      </div>
      <Range className="flex-1 mt-2 mx-2" rangeStyle={range} min={min} max={max} step={step} value={value}
        onChange={onChange} unspecifiedMax={unspecifiedMax}/>
      <RightIcon style={{
        width: rightIconSize,
        height: rightIconSize
      }}/>
    </div>
  );
};

export default RangeWithIcons;
