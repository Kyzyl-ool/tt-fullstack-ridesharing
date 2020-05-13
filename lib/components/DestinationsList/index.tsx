import React from 'react';
import _isEmpty from 'lodash/isEmpty';
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
  text = 'Выберите организацию, от/к которой будет совершаться поездка:'
}: IDestinationsList) => {
  return (
    <div className="destination-list__wrapper">
      <p className="destination-list__text">{text}</p>
      <ul className="destination-list__list">
        {!_isEmpty(destinations) ? (
          destinations.map(
            (destination, index) =>
              index < 4 && (
                <li className="destination-list__item" key={destination.address}>
                  <DestinationItem onSelectDestination={onSelectDestination} destination={destination} />
                </li>
              )
          )
        ) : (
          <div className="destination-list__text">По данному запросу не удалось найти подходящих адресов</div>
        )}
      </ul>
    </div>
  );
};
