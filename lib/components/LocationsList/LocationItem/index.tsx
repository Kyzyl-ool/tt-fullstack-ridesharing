import React from 'react';
import './LocationItem.scss';

interface ILocationItemProps {
  locationName: string;
  locationAddress: string;
  onSelectLocation: () => void;
}

export const LocationItem = ({ locationName, locationAddress, onSelectLocation }: ILocationItemProps) => {
  return (
    <div className="location-item__item" onClick={onSelectLocation}>
      <div className="location-item__icon"></div>
      <div className="location-item__info">
        <p className="location-item__name">{locationName}</p>
        <p className="location-item__address">{locationAddress}</p>
      </div>
    </div>
  );
};
