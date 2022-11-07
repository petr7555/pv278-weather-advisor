import React, { FC } from 'react';
import Header from './Header';

type Props = {
    children: React.ReactNode;
}

const Layout: FC<Props> = ({ children }) => {
  return (
    <div className={"h-screen"}>
      <Header />
      <div className={"container mx-auto pt-20 h-full"}>
        {children}
      </div>
    </div>
  );
};

export default Layout;
