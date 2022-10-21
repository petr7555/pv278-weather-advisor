import React, { FC } from 'react';

const Select: FC = () => {
  return (
    <select className="select w-full max-w-xs bg-[#ffe963] ml-10 mt-10">
      <option disabled selected>What would you like to do?</option>
      <option>Cycling</option>
      <option>Running</option>
      <option>Hiking</option>
      <option>Snorkeling</option>
      <option>Kayaking</option>
      <option>Skiing</option>
      <option>Cross-country skiing</option>
      <option>Honeymoon</option>
    </select>
  );
};

export default Select;
