import React, { useState } from 'react';
import _isEmpty from 'lodash/isEmpty';
import { Backdrop } from 'components/Backdrop';
import { FoundRides } from 'components/FoundRides';
import { Dialog } from 'components/Dialog';
import { PaymentBlock } from 'pages/blocks/PaymentBlock';
import { OrganizationSelectBlock } from 'pages/blocks/OrganizationSelectBlock';
import { DestinationSelectBlock } from 'pages/blocks/DestinationSelectBlock';
import { SearchRideBlock } from 'pages/blocks/SearchRideBlock';
import { InitialRideBlock } from 'pages/blocks/InitialRideBlock';
import { IDestination, ILocation } from 'domain/map';
import RideModel from 'models/RideModel';
import { IRide } from 'domain/ride';
import './JoinRidePage.scss';
import { useHistory } from 'react-router-dom';

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
    startOrganizationId: null,
    latitude: null,
    longitude: null
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
    setRideSearchingInformation({ ...rideSearchingInformation, startOrganizationId: organization.id });
    setSelectedOrganizationName(organization.name);
    setPageState('DESTINATION_CHOOSING');
  };

  const onSelectDestination = async ({ latitude, longitude }: IDestination['gps']) => {
    setRideSearchingInformation({ ...rideSearchingInformation, latitude, longitude });
    setPageState('SEARCHING');
    try {
      const rides = await RideModel.findRides({
        organizationId: rideSearchingInformation.startOrganizationId,
        latitude,
        longitude
      });
      setFetchedRides(rides);
      setPageState('SEARCH_COMPLETED');
    } catch (e) {
      setPageState('DESTINATION_CHOOSING');
      throw new Error(e);
    }
  };

  const onConfirmAddress = ({ gps: { latitude, longitude } }: IDestination) => {
    setRideSearchingInformation({ ...rideSearchingInformation, latitude, longitude });
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

  return (
    <div>
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
        onSelectDestination={onSelectDestination}
        startOrganizationName={selectedOrganizationName}
      />
      <SearchRideBlock onShowMenu={() => {}} visible={pageState === 'SEARCHING'} from="" to="" />
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
