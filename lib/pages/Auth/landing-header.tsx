import React, { ReactNode } from 'react';
import { Header, IHeaderProps } from 'components/Header';
import './Auth.scss';

interface ILandingHeader {
  children: ReactNode;
}

export const LandingHeader: React.FC<ILandingHeader & IHeaderProps> = ({ children }) => {
  return (
    <Header containerClassName="auth-header" withoutIcon={true}>
      {children}
    </Header>
  );
};
