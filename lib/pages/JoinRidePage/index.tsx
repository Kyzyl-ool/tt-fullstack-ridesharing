import React, { useState } from 'react';
import { Backdrop } from 'components/Backdrop';
import { FoundTrips } from 'components/FoundTrips';
import { Dialog } from 'components/Dialog';
import { PaymentBlock } from 'pages/blocks/PaymentBlock';
import { OrganizationSelectBlock } from 'pages/blocks/OrganizationSelectBlock';
import { DestinationSelectBlock } from 'pages/blocks/DestinationSelectBlock';
import { SearchRideBlock } from 'pages/blocks/SearchRideBlock';
import { InitialRideBlock } from 'pages/blocks/InitialRideBlock';
import { IDestination, ILocation } from 'domain/map';
import { sampleFoundTrips } from '../../samples/samples';
import './JoinRidePage.scss';

type PageState =
  | 'INITIAL'
  | 'ORGANIZATION_CHOOSING'
  | 'DESTINATION_CHOOSING'
  | 'SEARCHING'
  | 'SEARCH_COMPLETED'
  | 'PAYING'
  | 'DONE';

export const JoinRidePage = () => {
  const [pageState, setPageState] = useState<PageState>('INITIAL');
  const [rideSearchingInformation, setRideSearchingInformation] = useState({
    startOrganizationId: null,
    latitude: null,
    longitude: null
  });
  const [selectedOrganizationName, setSelectedOrganizationName] = useState('');

  const onStartOrganizationChoosing = () => {
    setPageState('ORGANIZATION_CHOOSING');
  };

  const onReturnToOrganizationChoosing = () => {
    setPageState('ORGANIZATION_CHOOSING');
  };

  const onReturnToInitial = () => {
    setPageState('INITIAL');
  };

  const onReturnToDestinationChoosing = () => {
    setPageState('DESTINATION_CHOOSING');
  };

  const onSelectOrganization = (organization: ILocation) => {
    console.log(organization);
    setRideSearchingInformation({ ...rideSearchingInformation, startOrganizationId: organization.id });
    setSelectedOrganizationName(organization.name);
    setPageState('DESTINATION_CHOOSING');
  };

  const onSelectDestination = ({ latitude, longitude }: IDestination['gps']) => {
    setRideSearchingInformation({ ...rideSearchingInformation, latitude, longitude });
    // TODO implement async request /ride/match
    setPageState('SEARCHING');
    setTimeout(() => setPageState('SEARCH_COMPLETED'), 3000);
  };

  const onSendRequest = () => {
    setPageState('PAYING');
  };

  const onPaymentConfirmed = () => {
    setPageState('DONE');
  };

  return (
    <div>
      <Backdrop>
        {pageState === 'INITIAL' && <InitialRideBlock onInputClick={onStartOrganizationChoosing} />}
        <OrganizationSelectBlock
          visible={pageState === 'ORGANIZATION_CHOOSING'}
          onGoBack={onReturnToInitial}
          onSelectOrganization={onSelectOrganization}
        />
        <DestinationSelectBlock
          visible={pageState === 'DESTINATION_CHOOSING'}
          onGoBack={onReturnToOrganizationChoosing}
          onSelectDestination={onSelectDestination}
          startOrganizationName={selectedOrganizationName}
        />
        <SearchRideBlock onShowMenu={() => {}} visible={pageState === 'SEARCHING'} from="" to="" />
        {pageState === 'SEARCH_COMPLETED' && <FoundTrips onSendRequest={onSendRequest} trips={sampleFoundTrips} />}
        {pageState === 'PAYING' && <PaymentBlock amountToPay={130} onPaymentConfirmed={onPaymentConfirmed} />}
        {pageState === 'DONE' && (
          <Dialog hide={false}>
            Запрос на присоединение к поездке отправлен. Ответ водителя будет направлен вам по push-уведомлению
          </Dialog>
        )}
      </Backdrop>
    </div>
  );
};
