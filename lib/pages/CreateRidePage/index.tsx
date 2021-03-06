import React, { useState } from 'react';
import { Dialog } from 'components/Dialog';
import { CarSelectBlock } from 'pages/blocks/CarSelectBlock';
import { InitialRideBlock } from '../blocks/InitialRideBlock';
import { OrganizationSelectBlock } from '../blocks/OrganizationSelectBlock';
import { DestinationSelectBlock } from '../blocks/DestinationSelectBlock';
import { RideInformationBlock } from 'pages/blocks/RideInformationBlock';
import { ILocation, IDestination } from 'domain/map';
import RideModel from 'models/RideModel';
import { IRideCreationInfo } from 'domain/ride';
import { useHistory } from 'react-router-dom';

type PageState =
  | 'INITIAL'
  | 'ORGANIZATION_CHOOSING'
  | 'DESTINATION_CHOOSING'
  | 'CAR_CHOOSING'
  | 'RIDE_INFORMATION'
  | 'DONE';

export const CreateRidePage = () => {
  const [pageState, setPageState] = useState<PageState>('ORGANIZATION_CHOOSING');
  const [rideCreationInfo, setRideCreationInfo] = useState<IRideCreationInfo>({
    carId: null,
    organizationId: null,
    latitude: null,
    longitude: null,
    totalSeats: null,
    price: null,
    startDatetime: null,
    fromOrganization: true
  });
  const [selectedOrganizationName, setSelectedOrganizationName] = useState('');
  const history = useHistory();

  const onStartOrganizationChoosing = () => {
    setPageState('ORGANIZATION_CHOOSING');
  };

  const onReturnToOrganizationChoosing = () => {
    setPageState('ORGANIZATION_CHOOSING');
  };

  const onReturnToInitial = () => {
    // setPageState('INITIAL');
    history.push('/');
  };

  const onReturnToDestinationChoosing = () => {
    setPageState('DESTINATION_CHOOSING');
  };

  const onSelectOrganization = (organization: ILocation) => {
    setRideCreationInfo({ ...rideCreationInfo, organizationId: organization.id });
    setSelectedOrganizationName(organization.name);
    setPageState('DESTINATION_CHOOSING');
  };

  const onSelectDestination = ({ latitude, longitude }: IDestination['gps']) => {
    setRideCreationInfo({ ...rideCreationInfo, latitude, longitude });
    setPageState('CAR_CHOOSING');
  };

  const onReturnToCarChoosing = () => {
    setPageState('CAR_CHOOSING');
  };

  const onCarSelect = (carId: string) => {
    setRideCreationInfo({ ...rideCreationInfo, carId });
    setPageState('RIDE_INFORMATION');
  };

  const onCreateRide = async () => {
    // TODO implement async request PUT /ride
    try {
      await RideModel.createRide(rideCreationInfo);
      setPageState('DONE');
    } catch (e) {
      throw new Error(e);
    }
  };

  const onSeatsNumberChange = (totalSeats: string) => {
    setRideCreationInfo({ ...rideCreationInfo, totalSeats });
  };

  const onPriceChange = (price: string) => {
    setRideCreationInfo({ ...rideCreationInfo, price });
  };

  const onDateChange = (dateInTimestamp: number) => {
    setRideCreationInfo({ ...rideCreationInfo, startDatetime: new Date(dateInTimestamp).toISOString() });
  };

  const onChangeDirection = (fromOrganization: boolean) => {
    setRideCreationInfo({ ...rideCreationInfo, fromOrganization });
  };

  const onConfirmAddress = ({ gps: { latitude, longitude } }: IDestination) => {
    setRideCreationInfo({ ...rideCreationInfo, latitude, longitude });
  };

  const onDialogClose = () => history.push('/');

  return (
    <div>
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
        onConfirmAddress={onConfirmAddress}
        onChangeDirection={onChangeDirection}
        fromOrganization={rideCreationInfo.fromOrganization}
        startOrganizationName={selectedOrganizationName}
      />
      <CarSelectBlock
        visible={pageState === 'CAR_CHOOSING'}
        onGoBack={onReturnToDestinationChoosing}
        onCarInfoChange={() => {}}
        onCarSelect={onCarSelect}
        onDelete={() => {}}
      />
      <RideInformationBlock
        visible={pageState === 'RIDE_INFORMATION'}
        onCreateRide={onCreateRide}
        onGoBack={onReturnToCarChoosing}
        onPriceChange={onPriceChange}
        onSeatsNumberChange={onSeatsNumberChange}
        onDateChange={onDateChange}
        rideInfo={rideCreationInfo}
      />
      {pageState === 'DONE' && (
        <Dialog onClose={onDialogClose} hide={false}>
          Новая поездка успешно создана. Запросы от пассажиров будут направлены вам push-уведомлением.
        </Dialog>
      )}
    </div>
  );
};
