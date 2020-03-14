import React, { ReactNode } from 'react';
import { Map } from 'components/Map';
import './Backdrop.scss';

interface IBackdropProps {
  children: ReactNode;
  mapClassName?: string;
}

export const Backdrop = ({ children, mapClassName = '' }: IBackdropProps) => {
  return (
    <div className="rsh-backdrop">
      <Map className="rsh-backdrop__map" />
      {children}
    </div>
  );
};
