import React, { FC } from 'react';
import Header from './Header';

type Props = {
    children: React.ReactNode;
}

const Layout: FC<Props> = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default Layout;
