import React from 'react';
import { LocationItem } from './LocationItem';
import './LocationsList.scss';

type ILocation = {
  name: string;
  address: string;
};

interface ILocationsList {
  text?: string;
  locations: ILocation[];
  onSelectLocation: () => void;
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
        {locations.map(location => (
          <li className="location-list__item" key={location.name}>
            <LocationItem
              onSelectLocation={onSelectLocation}
              locationName={location.name}
              locationAddress={location.address}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
