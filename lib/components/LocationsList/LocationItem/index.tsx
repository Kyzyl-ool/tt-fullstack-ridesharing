import React from 'react';
import { ILocation } from 'domain/map';
import './LocationItem.scss';

interface ILocationItemProps {
  location: ILocation;
  onSelectLocation: (location: ILocation) => void;
}

export const LocationItem = ({ location, onSelectLocation }: ILocationItemProps) => {
  const onClick = () => {
    onSelectLocation(location);
  };

  return (
    <div className="location-item__item" onClick={onClick}>
      <div className="location-item__icon"></div>
      <div className="location-item__info">
        <p className="location-item__name">{location.name}</p>
        <p className="location-item__address">{location.address}</p>
      </div>
    </div>
  );
};
