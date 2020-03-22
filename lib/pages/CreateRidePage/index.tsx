import React, { useState } from 'react';
import { Backdrop } from 'components/Backdrop';
import { Dialog } from 'components/Dialog';
import { CarSelectBlock } from 'pages/blocks/CarSelectBlock';
import { InitialRideBlock } from '../blocks/InitialRideBlock';
import { OrganizationSelectBlock } from '../blocks/OrganizationSelectBlock';
import { DestinationSelectBlock } from '../blocks/DestinationSelectBlock';
import { userCarsStub } from '../__stubs__';
import { RideInformationBlock } from 'pages/blocks/RideInformationBlock';

type PageState =
  | 'INITIAL'
  | 'ORGANIZATION_CHOOSING'
  | 'DESTINATION_CHOOSING'
  | 'CAR_CHOOSING'
  | 'RIDE_INFORMATION'
  | 'DONE';

export const CreateRidePage = () => {
  const [pageState, setPageState] = useState<PageState>('INITIAL');

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

  const onSelectOrganization = () => {
    setPageState('DESTINATION_CHOOSING');
  };

  const onSelectDestination = () => {
    setPageState('CAR_CHOOSING');
  };

  const onReturnToCarChoosing = () => {
    setPageState('CAR_CHOOSING');
  };

  const onCarSelect = () => {
    setPageState('RIDE_INFORMATION');
  };

  const onCreateRide = () => {
    setPageState('DONE');
  };

  return (
    <div>
      <Backdrop>
        {pageState === 'INITIAL' && (
          <InitialRideBlock nearestOrganizationName="Mail.ru Corp." onInputClick={onStartOrganizationChoosing} />
        )}
        <OrganizationSelectBlock
          visible={pageState === 'ORGANIZATION_CHOOSING'}
          nearestOrganizationName="Mail.ru Corp."
          onGoBack={onReturnToInitial}
          onSelectOrganization={onSelectOrganization}
        />
        <DestinationSelectBlock
          visible={pageState === 'DESTINATION_CHOOSING'}
          onGoBack={onReturnToOrganizationChoosing}
          onSelectDestination={onSelectDestination}
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
