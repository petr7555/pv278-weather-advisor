import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Header from './Header';

const Profile = () => {
  const { user } = useAuth0();

  return (
    <>
      <Header/>
      <div>
        <h2>{user?.name}</h2>
        <p>{user?.email}</p>
      </div>
    </>
  );
};

export default Profile;
