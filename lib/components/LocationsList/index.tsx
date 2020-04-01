import React from 'react';
import _isEmpty from 'lodash/isEmpty';
import { ILocation } from 'domain/map';
import { LocationItem } from './LocationItem';
import './LocationsList.scss';
import { PlusIcon } from '../../icons';

interface ILocationsList {
  text?: string;
  locations: ILocation[];
  onSelectLocation: (location: ILocation) => void;
  onReadyButtonClick?: () => void;
  onAddNewOrganization?: () => void;
  onCreateNewOrganization?: () => void;
}

export const LocationsList = ({
  locations,
  onSelectLocation,
  text = 'Выберите организацию, от которой будет начинаться поездка:',
  onReadyButtonClick,
  onAddNewOrganization,
  onCreateNewOrganization
}: ILocationsList) => {
  return (
    <div className="location-list__wrapper">
      {onReadyButtonClick && (
        <span onClick={onReadyButtonClick} className={'ready-button'}>
          Готово
        </span>
      )}
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
      {onAddNewOrganization && (
        <ul className="location-item__item location-item__item_add" onClick={onAddNewOrganization}>
          <PlusIcon />
          Присоединиться к существующей
        </ul>
      )}
      {onCreateNewOrganization && (
        <ul className="location-item__item location-item__item_add" onClick={onCreateNewOrganization}>
          <PlusIcon />
          Создать новую
        </ul>
      )}
    </div>
  );
};
