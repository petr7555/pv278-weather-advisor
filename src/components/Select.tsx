import React, { FC, useState } from 'react';

type Props = {
    initialOption: string;
    options: string[];
}

const Select: FC<Props> = ({ initialOption, options }) => {
  const [value, setValue] = useState(initialOption);

  const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(event.target.value);
  };

  return (
    <select value={value} onChange={onChange} className="select w-full max-w-xs bg-secondary">
      <option disabled>{initialOption}</option>
      {options.map((option) => (
        <option key={option}>{option}</option>
      ))}
    </select>
  );
};

export default Select;
