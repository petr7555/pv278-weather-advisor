import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import BackButton from './BackButton';

const Profile = () => {
  const { user } = useAuth0();

  return (
    <>
      <BackButton/>
      <div className={"prose prose-2xl text-center max-w-none"}>
        <h1>{user?.name}</h1>
        <p>{user?.email}</p>
      </div>
    </>
  );
};

export default Profile;
