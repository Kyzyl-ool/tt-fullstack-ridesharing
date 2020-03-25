import React, { ReactNode } from 'react';
import { ViewportProps } from 'react-map-gl';
import { Map } from 'components/Map';
import './Backdrop.scss';

interface IBackdropProps {
  children: ReactNode;
  mapClassName?: string;
  onMapViewportChange?: (viewport: ViewportProps) => Promise<void>;
  onMapClicked?: (newPosition: { longitude: number; latitude: number }) => void;
}

export const Backdrop = ({ children, mapClassName = '', onMapViewportChange, onMapClicked }: IBackdropProps) => {
  return (
    <div className="rsh-backdrop">
      <Map onMapClicked={onMapClicked} onViewportChange={onMapViewportChange} className="rsh-backdrop__map" />
      {children}
    </div>
  );
};
