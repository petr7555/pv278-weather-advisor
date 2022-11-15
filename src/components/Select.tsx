import React, { FC } from 'react';
import clsx from 'clsx';

type Props = {
    initialOption: string;
    options: string[];
    value: string;
    onChange: (value: string) => void;
    className?: string;
}
// TODO reselection of the same option should reset values
const Select: FC<Props> = ({ initialOption, options,value, onChange, className }) => {

  const onSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value);
  };

  return (
    <select value={value} onChange={onSelectChange} className={clsx("select w-full max-w-xs bg-secondary", className)}>
      <option disabled>{initialOption}</option>
      {options.map((option) => (
        <option key={option}>{option}</option>
      ))}
    </select>
  );
};

export default Select;
