import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import BackButton from './BackButton';

const Profile = () => {
  const { user } = useAuth0();

  return (
    <div className={""}>
      <BackButton/>
      <div className={"prose prose-2xl text-center flex-1"}>
        <h1>{user?.name}</h1>
        <p>{user?.email}</p>
      </div>
    </div>
  );
};

export default Profile;
