import React from 'react';
import { IDestination } from 'domain/map';
import { DestinationItem } from './DestinationItem';
import './DestinationsList.scss';

interface IDestinationsList {
  text?: string;
  destinations: IDestination[];
  onSelectDestination: (gps: IDestination['gps']) => void;
}

export const DestinationsList = ({
  destinations,
  onSelectDestination,
  text = 'Выберите организацию, от которой будет начинаться поездка:'
}: IDestinationsList) => {
  return (
    <div className="destination-list__wrapper">
      <p className="destination-list__text">{text}</p>
      <ul className="destination-list__list">
        {destinations.map(
          (destination, index) =>
            index < 4 && (
              <li className="destination-list__item" key={destination.address}>
                <DestinationItem onSelectDestination={onSelectDestination} destination={destination} />
              </li>
            )
        )}
      </ul>
    </div>
  );
};
