/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-empty-interface */
import React, { useState, Fragment } from 'react';
import { CSSTransition } from 'react-transition-group';
import { Container } from 'semantic-ui-react';
import { Header, IconType } from 'components/Header';
import { Backdrop } from 'components/Backdrop';
import { Input } from 'components/Input';
import { Slider } from 'components/Slider';
import { SearchingTrips } from 'components/Searching';
import { FoundTrips } from 'components/FoundTrips';
import { NearestOrganizationLabel } from 'components/NearestOrganizationLabel';
import { LocationsList } from 'components/LocationsList';
import { organizationsListStub, locationsListStub, currentOrganizationStub } from '../__stubs__';
import { sampleFoundTrips } from '../../samples/samples';
import './JoinRidePage.scss';

type PageState =
  | 'INITIAL'
  | 'ORGANIZATION_CHOOSING'
  | 'DESTINATION_CHOOSING'
  | 'SEARCHING'
  | 'SEARCH_COMPLETED'
  | 'PAYING';

export const JoinRidePage = () => {
  const [pageState, setPageState] = useState<PageState>('INITIAL');
  // const [isOrganizationListShown, setIsOrganizationListShown] = useState(false);
  // const [isDestinationChoosingInProcess] = useState(false)

  const onStartOrganizationChoosing = () => {
    // setIsOrganizationListShown(true);
    setPageState('ORGANIZATION_CHOOSING');
  };

  const onReturnToOrganizationChoosing = () => {
    setPageState('ORGANIZATION_CHOOSING');
  };

  const onReturnToInitial = () => {
    // setIsOrganizationListShown(false);
    setPageState('INITIAL');
  };

  const onReturnToDestinationChoosing = () => {
    setPageState('DESTINATION_CHOOSING');
  };

  const renderHeader = () => {
    if (pageState === 'INITIAL') {
      return (
        <Header iconType="menu" onIconClick={() => {}}>
          <div className="join-ride-page__organization-label">
            <NearestOrganizationLabel nearestOrganizationName="Mail.ru Corp." onClick={onStartOrganizationChoosing} />
          </div>
        </Header>
      );
    }
    if (pageState === 'DESTINATION_CHOOSING') {
      return (
        <Header iconType="back" onIconClick={onReturnToOrganizationChoosing}>
          <div className="join-ride-page__header-text">Укажите пункт назначения</div>
        </Header>
      );
    }
    if (pageState === 'ORGANIZATION_CHOOSING') {
      return (
        <Header iconType="back" onIconClick={onReturnToInitial}>
          <div className="join-ride-page__organization-label">
            <NearestOrganizationLabel nearestOrganizationName="Mail.ru Corp." onClick={onStartOrganizationChoosing} />
          </div>
        </Header>
      );
    }
    if (pageState === 'PAYING') {
      return (
        <Header iconType="back" onIconClick={onReturnToDestinationChoosing}>
          <div className="join-ride-page__header-text">Выберите способ оплаты</div>;
        </Header>
      );
    }
    if (pageState === 'SEARCHING') {
      return (
        <Header iconType="menu" onIconClick={() => {}}>
          <div className="join-ride-page__header-text">Поиск</div>
        </Header>
      );
    }
    if (pageState === 'SEARCH_COMPLETED') {
      return (
        <Header iconType="back" onIconClick={onReturnToDestinationChoosing}>
          <div className="join-ride-page__header-text">Найденные поездки</div>
        </Header>
      );
    }
  };

  const onSelectOrganization = () => {
    setPageState('DESTINATION_CHOOSING');
  };

  const onSelectDestination = () => {
    setPageState('SEARCHING');
    setTimeout(() => setPageState('SEARCH_COMPLETED'), 3000);
  };

  return (
    <div>
      {renderHeader()}
      <Backdrop>
        {pageState === 'INITIAL' && (
          <div onClick={onStartOrganizationChoosing}>
            <Input
              id="departure"
              className="join-ride-page__fixed-input"
              placeholderText="Откуда едете?"
              icon={<div className="join-ride-page__input-icon--from" />}
            />
          </div>
        )}
        <Slider showCondition={pageState === 'ORGANIZATION_CHOOSING'} from="bottom" timeout={600} unmountOnExit>
          <div className="join-ride-page__organizations-list">
            <LocationsList locations={organizationsListStub} onSelectLocation={onSelectOrganization} />
          </div>
        </Slider>
        <Slider showCondition={pageState === 'DESTINATION_CHOOSING'} from="top" timeout={400} unmountOnExit>
          <div>
            <div className="join-ride-page__input-form">
              <Input
                id="departure"
                defaultValue="Mail.ru Corp."
                className="join-ride-page__input"
                placeholderText=""
                icon={<div className="join-ride-page__input-icon--from" />}
              />
              <Input
                id="arrival"
                className="join-ride-page__input"
                placeholderText=""
                icon={<div className="join-ride-page__input-icon--to" />}
              />
            </div>
            <div className="join-ride-page__destinations-list">
              <LocationsList text="" locations={locationsListStub} onSelectLocation={onSelectDestination} />
            </div>
          </div>
        </Slider>
        <Slider showCondition={pageState === 'SEARCHING'} from="bottom" timeout={400} unmountOnExit>
          <div className="join-ride-page__searching-window">
            <SearchingTrips from="Mail.ru Corp" to="" />
          </div>
        </Slider>
        {pageState === 'SEARCH_COMPLETED' && <FoundTrips trips={sampleFoundTrips} />}
      </Backdrop>
    </div>
  );
};
