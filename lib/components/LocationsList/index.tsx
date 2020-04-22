import React, { Fragment } from 'react';
import _isEmpty from 'lodash/isEmpty';
import { ILocation } from 'domain/map';
import { LocationItem } from './LocationItem';
import { PlusIcon } from '../../icons';
import Loader from 'react-loader-spinner';
import './LocationsList.scss';

interface ILocationsList {
  text?: string;
  locations: ILocation[];
  onSelectLocation: (location: ILocation) => void;
  onReadyButtonClick?: () => void;
  onAddNewOrganization?: () => void;
  onCreateNewOrganization?: () => void;
  withLoader?: boolean;
  withAdding?: boolean;
  isLoaded?: boolean;
}

export const LocationsList = ({
  locations,
  onSelectLocation,
  text = 'Выберите организацию, от которой будет начинаться поездка:',
  onReadyButtonClick,
  onAddNewOrganization,
  onCreateNewOrganization,
  withLoader = false,
  withAdding = true,
  isLoaded = false
}: ILocationsList) => {
  const renderLocationList = () => {
    return (
      <Fragment>
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
              <div className="location-list__text">
                К сожалению, не удалось найти ваши организации. Создайте новую или присоединитесь к существующей.
              </div>
            )}
          </ul>
          {withAdding && (
            <Fragment>
              <ul className="location-item__item location-item__item_add" onClick={onAddNewOrganization}>
                <PlusIcon />
                Присоединиться к существующей
              </ul>
              <ul className="location-item__item location-item__item_add" onClick={onCreateNewOrganization}>
                <PlusIcon />
                Создать новую
              </ul>
            </Fragment>
          )}
        </div>
      </Fragment>
    );
  };
  return (
    <Fragment>
      {!withLoader ? (
        renderLocationList()
      ) : isLoaded ? (
        renderLocationList()
      ) : (
        <div className="location-list__loader">
          <Loader type="Oval" />
        </div>
      )}
    </Fragment>
  );
};
