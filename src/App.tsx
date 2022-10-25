import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import LandingPage from './components/LandingPage';
import { BrowserRouter } from 'react-router-dom';
import RoutesSwitch from './components/RoutesSwitch';
import Layout from './components/Layout';


const App = () => {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return (
      <div className="hero min-h-screen bg-top"
        style={{ backgroundImage: 'url("/landing_page_background.jpg")' }}>
        <progress className="progress w-56 progress-primary"></progress>
      </div>
    );
  }

  return (
    isAuthenticated ? (
      <BrowserRouter>
        <Layout>
          <RoutesSwitch/>
        </Layout>
      </BrowserRouter>)
      : <LandingPage/>
  );
};

export default App;
