import React from 'react';
import _isEmpty from 'lodash/isEmpty';
import { ILocation } from 'domain/map';
import { LocationItem } from './LocationItem';
import './LocationsList.scss';

interface ILocationsList {
  text?: string;
  locations: ILocation[];
  onSelectLocation: (location: ILocation) => void;
}

export const LocationsList = ({
  locations,
  onSelectLocation,
  text = 'Выберите организацию, от которой будет начинаться поездка:'
}: ILocationsList) => {
  return (
    <div className="location-list__wrapper">
      <p className="location-list__text">{text}</p>
      <ul className="location-list__list">
        {!_isEmpty(locations) ? (
          locations.map(location => (
            <li className="location-list__item" key={location.id}>
              <LocationItem onSelectLocation={onSelectLocation} location={location} />
            </li>
          ))
        ) : (
          <div className="location-list__text">К сожалению, не удалось найти ваши организации</div>
        )}
      </ul>
    </div>
  );
};
