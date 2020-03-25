import React, { useState } from 'react';
import { Backdrop } from 'components/Backdrop';
import { Dialog } from 'components/Dialog';
import { CarSelectBlock } from 'pages/blocks/CarSelectBlock';
import { InitialRideBlock } from '../blocks/InitialRideBlock';
import { OrganizationSelectBlock } from '../blocks/OrganizationSelectBlock';
import { DestinationSelectBlock } from '../blocks/DestinationSelectBlock';
import { userCarsStub } from '../__stubs__';
import { RideInformationBlock } from 'pages/blocks/RideInformationBlock';
import { ILocation, IDestination } from 'domain/map';

type PageState =
  | 'INITIAL'
  | 'ORGANIZATION_CHOOSING'
  | 'DESTINATION_CHOOSING'
  | 'CAR_CHOOSING'
  | 'RIDE_INFORMATION'
  | 'DONE';

export const CreateRidePage = () => {
  const [pageState, setPageState] = useState<PageState>('INITIAL');
  const [rideCreationInfo, setRideCreationInfo] = useState({
    carId: null,
    organizationId: null,
    latitude: null,
    longitude: null,
    amountOfSeats: null,
    cost: null,
    paymentMethod: 'BY_CASH'
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

  const onCreateRide = () => {
    // TODO implement async request PUT /ride
    setPageState('DONE');
  };

  const onPlaceChange = (amountOfSeats: string) => {
    setRideCreationInfo({ ...rideCreationInfo, amountOfSeats });
  };

  const onCostChange = (cost: string) => {
    setRideCreationInfo({ ...rideCreationInfo, cost });
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
        <CarSelectBlock
          userCars={userCarsStub}
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
          onCostChange={onCostChange}
          onPlaceChange={onPlaceChange}
        />
        {pageState === 'DONE' && (
          <Dialog hide={false}>
            Новая поездка успешно создана. Запросы от пассажиров будут направлены вам push-уведомлением.
          </Dialog>
        )}
      </Backdrop>
    </div>
  );
};
