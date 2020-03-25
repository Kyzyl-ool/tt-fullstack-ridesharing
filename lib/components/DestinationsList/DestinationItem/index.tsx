import React from 'react';
import { IDestination } from 'domain/map';
import './DestinationItem.scss';

interface IDestinationItemProps {
  destination: IDestination;
  onSelectDestination: (gps: IDestination['gps']) => void;
}

export const DestinationItem = ({ destination: { gps, address }, onSelectDestination }: IDestinationItemProps) => {
  const onClick = () => {
    onSelectDestination(gps);
  };

  return (
    <div className="destination-item__item" onClick={onClick}>
      <div className="destination-item__icon"></div>
      <div className="destination-item__info">
        <p className="destination-item__address">{address}</p>
      </div>
    </div>
  );
};
