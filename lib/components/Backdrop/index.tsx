import React, { ReactNode } from 'react';
import { ViewportProps } from 'react-map-gl';
import { Map } from 'components/Map';
import './Backdrop.scss';

interface IBackdropProps {
  children: ReactNode;
  mapClassName?: string;
  onMapViewportChange?: (viewport: ViewportProps) => Promise<void>;
}

export const Backdrop = ({ children, mapClassName = '', onMapViewportChange }: IBackdropProps) => {
  return (
    <div className="rsh-backdrop">
      <Map onViewportChange={onMapViewportChange} className="rsh-backdrop__map" />
      {children}
    </div>
  );
};
