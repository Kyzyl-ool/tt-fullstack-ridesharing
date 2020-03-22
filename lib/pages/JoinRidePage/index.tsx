import React, { useState } from 'react';
import { Backdrop } from 'components/Backdrop';
import { FoundTrips } from 'components/FoundTrips';
import { Dialog } from 'components/Dialog';
import { PaymentBlock } from 'pages/blocks/PaymentBlock';
import { OrganizationSelectBlock } from 'pages/blocks/OrganizationSelectBlock';
import { DestinationSelectBlock } from 'pages/blocks/DestinationSelectBlock';
import { SearchRideBlock } from 'pages/blocks/SearchRideBlock';
import { InitialRideBlock } from 'pages/blocks/InitialRideBlock';
import MapModel from 'models/MapModel';
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
    setPageState('SEARCHING');
    setTimeout(() => setPageState('SEARCH_COMPLETED'), 3000);
  };

  const onSendRequest = () => {
    setPageState('PAYING');
  };

  const onPaymentConfirmed = () => {
    setPageState('DONE');
  };

  const onMapViewportChange = async ({ latitude, longitude }) => {
    try {
      console.log({ latitude, longitude });
      const data = await MapModel.getNearestOrganization({ latitude, longitude });
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <Backdrop onMapViewportChange={onMapViewportChange}>
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
