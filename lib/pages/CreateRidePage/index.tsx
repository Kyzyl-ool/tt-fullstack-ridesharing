import React, { useState } from 'react';
import { Backdrop } from 'components/Backdrop';
import { Dialog } from 'components/Dialog';
import { CarSelectBlock } from 'pages/blocks/CarSelectBlock';
import { InitialRideBlock } from '../blocks/InitialRideBlock';
import { OrganizationSelectBlock } from '../blocks/OrganizationSelectBlock';
import { DestinationSelectBlock } from '../blocks/DestinationSelectBlock';
import { userCarsStub } from '../__stubs__';

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

  const onPaymentConfirmed = () => {
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
          onCarSelect={() => {}}
          onDelete={() => {}}
        />
        {pageState === 'DONE' && (
          <Dialog hide={false}>
            Запрос на присоединение к поездке отправлен. Ответ водителя будет направлен вам по push-уведомлению
          </Dialog>
        )}
      </Backdrop>
    </div>
  );
};
