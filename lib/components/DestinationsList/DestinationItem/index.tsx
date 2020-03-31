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

  const getDestinationName = () => {
    const destinationArray = address.split(', ');
    return destinationArray.slice(-2).join(', ');
  };

  const getDestinationAddress = () => {
    const destinationArray = address.split(', ');
    return destinationArray.slice(0, destinationArray.length - 3).join(', ');
  };

  return (
    <div className="destination-item__item" onClick={onClick}>
      <div className="destination-item__icon"></div>
      <div className="destination-item__info">
        <p className="destination-item__name">{getDestinationName()}</p>
        <p className="destination-item__address">{getDestinationAddress()}</p>
      </div>
    </div>
  );
};
