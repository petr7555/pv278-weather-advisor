import React, { FC } from 'react';

type Props = {
    initialOption: string;
    options: string[];
    value: string;
    onChange: (value: string) => void;
}

const Select: FC<Props> = ({ initialOption, options,value, onChange }) => {

  const onSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value);
  };

  return (
    <select value={value} onChange={onSelectChange} className="select w-full max-w-xs bg-secondary">
      <option disabled>{initialOption}</option>
      {options.map((option) => (
        <option key={option}>{option}</option>
      ))}
    </select>
  );
};

export default Select;
