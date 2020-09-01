import React, { useState } from 'react';
import _isEmpty from 'lodash/isEmpty';
import { useHistory } from 'react-router-dom';
import { FoundRides } from 'components/FoundRides';
import { Dialog } from 'components/Dialog';
import { PaymentBlock } from 'pages/blocks/PaymentBlock';
import { OrganizationSelectBlock } from 'pages/blocks/OrganizationSelectBlock';
import { DestinationSelectBlock } from 'pages/blocks/DestinationSelectBlock';
import { SearchRideBlock } from 'pages/blocks/SearchRideBlock';
import { InitialRideBlock } from 'pages/blocks/InitialRideBlock';
import { IDestination, ILocation, IDirectedDestination } from 'domain/map';
import RideModel from 'models/RideModel';
import { IRide } from 'domain/ride';
import './JoinRidePage.scss';
import './JoinRidePage.desktop.scss';

type PageState =
  | 'INITIAL'
  | 'ORGANIZATION_CHOOSING'
  | 'DESTINATION_CHOOSING'
  | 'SEARCHING'
  | 'SEARCH_COMPLETED'
  | 'PAYING'
  | 'DONE';

export const JoinRidePage = () => {
  const [pageState, setPageState] = useState<PageState>('ORGANIZATION_CHOOSING');
  const [rideSearchingInformation, setRideSearchingInformation] = useState({
    organizationId: null,
    latitude: null,
    longitude: null,
    fromOrganization: true
  });
  const [selectedRideId, setSelectedRideId] = useState<number>(null);
  const [selectedOrganizationName, setSelectedOrganizationName] = useState('');
  const [fetchedRides, setFetchedRides] = useState<IRide[]>([]);
  const history = useHistory();

  const onStartOrganizationChoosing = () => {
    setPageState('ORGANIZATION_CHOOSING');
  };

  const onReturnToOrganizationChoosing = () => {
    setPageState('ORGANIZATION_CHOOSING');
  };

  const onReturnToInitial = () => {
    history.push('/');
  };

  const onReturnToDestinationChoosing = () => {
    setPageState('DESTINATION_CHOOSING');
  };

  const onSelectOrganization = (organization: ILocation) => {
    setRideSearchingInformation({ ...rideSearchingInformation, organizationId: organization.id });
    setSelectedOrganizationName(organization.name);
    setPageState('DESTINATION_CHOOSING');
  };

  const onSelectDestination = async ({ latitude, longitude }: IDestination['gps']) => {
    setRideSearchingInformation({ ...rideSearchingInformation, latitude, longitude });
    setPageState('SEARCHING');
    try {
      const rides = await RideModel.findRides({
        organizationId: rideSearchingInformation.organizationId,
        latitude,
        longitude,
        fromOrganization: rideSearchingInformation.fromOrganization
      });
      setFetchedRides(rides);
      setPageState('SEARCH_COMPLETED');
    } catch (e) {
      setPageState('DESTINATION_CHOOSING');
      throw new Error(e);
    }
  };

  const onConfirmAddress = async ({ gps: { latitude, longitude } }: IDestination) => {
    setRideSearchingInformation({ ...rideSearchingInformation, latitude, longitude });
    await onSelectDestination({ latitude, longitude });
  };

  const onSendRequest = () => {
    // we must pay before sending request
    // when paying is done --> send request
    setPageState('PAYING');
  };

  const onSelectRide = (rideId: number) => {
    setSelectedRideId(rideId);
  };

  const onPaymentConfirmed = async () => {
    try {
      await RideModel.joinRide(selectedRideId);
      setPageState('DONE');
    } catch (e) {
      throw new Error(e);
    }
  };

  const onDialogClose = () => history.push('/');

  const getPriceToPay = () =>
    !_isEmpty(fetchedRides) ? fetchedRides.find(ride => ride.id === selectedRideId).price : 0;

  const onChangeDirection = (fromOrganization: boolean) => {
    setRideSearchingInformation({ ...rideSearchingInformation, fromOrganization });
  };

  return (
    <div className="join-ride-page">
      {pageState === 'INITIAL' && <InitialRideBlock onInputClick={onStartOrganizationChoosing} />}
      <OrganizationSelectBlock
        visible={pageState === 'ORGANIZATION_CHOOSING'}
        onGoBack={onReturnToInitial}
        onSelectOrganization={onSelectOrganization}
      />
      <DestinationSelectBlock
        onConfirmAddress={onConfirmAddress}
        visible={pageState === 'DESTINATION_CHOOSING'}
        onGoBack={onReturnToOrganizationChoosing}
        onChangeDirection={onChangeDirection}
        fromOrganization={rideSearchingInformation.fromOrganization}
        onSelectDestination={onSelectDestination}
        startOrganizationName={selectedOrganizationName}
      />
      <SearchRideBlock
        onCancelSearch={onReturnToDestinationChoosing}
        onShowMenu={() => {}}
        visible={pageState === 'SEARCHING'}
        from=""
        to=""
      />
      {pageState === 'SEARCH_COMPLETED' && (
        <FoundRides
          onGoBack={onReturnToDestinationChoosing}
          onSelectRide={onSelectRide}
          onSendRequest={onSendRequest}
          rides={fetchedRides}
        />
      )}
      {pageState === 'PAYING' && <PaymentBlock amountToPay={getPriceToPay()} onPaymentConfirmed={onPaymentConfirmed} />}
      {pageState === 'DONE' && (
        <Dialog onClose={onDialogClose} hide={false}>
          Запрос на присоединение к поездке отправлен. Ответ водителя будет направлен вам по push-уведомлению
        </Dialog>
      )}
    </div>
  );
};
