import React from 'react';
import Profile from './Profile';
import Location from './Location';
import { Navigate, Route, Routes } from 'react-router-dom';
import Dashboard from './Dashboard/Dashboard';

const RoutesSwitch = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/location/:locationId" element={<Location />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="*" element={<Navigate replace to="/" />} />
    </Routes>
  );
};

export default RoutesSwitch;
