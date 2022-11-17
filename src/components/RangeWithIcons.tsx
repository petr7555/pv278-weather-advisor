import React, { FC, FunctionComponent, SVGProps } from 'react';
import Range from './Range';
import { useWindowSize } from 'usehooks-ts';

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

  const { width } = useWindowSize();
  const iconSize = '2.5rem';

  const tooltipPosition = width < 500 ? 'right' : 'top';
  
  return (
    <div className={'flex flex-1 justify-center min-w-[340px] md:min-w-[500px]'}>
      <div className={`tooltip tooltip-secondary tooltip-${tooltipPosition} before:border-2 before:border-primary before:text-neutral before:w-48 md:tooltip-top md:before:w-max before:content-[attr(data-tip)] z-10`} data-tip={dataTip}>
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
