import React, { useEffect, useState } from 'react';
import { Header } from '../../components/Header';
import Cars from './4/Cars';
import { TripInfo } from './5/TripInfo';
import { Dialog } from '../../components/Dialog/Dialog';
import { Input } from '../../components/Input/Input';
import './index.scss';

enum PageType {
  FROM = 0,
  CHOOSE_ORG,
  TO,
  CAR,
  TRIP_INFO,
  CREATED
}

function showIf(statement: boolean, node: React.ReactNode): React.ReactNode {
  return statement ? node : null;
}

export const TripCreation: React.FC = props => {
  const [pageNumber, setPageNumber] = useState<PageType>(PageType.TRIP_INFO);

  return (
    <div className={'trip-creation'}>
      {/*todo: make goback func*/}
      {/* eslint-disable-next-line @typescript-eslint/no-empty-function */}
      <Header iconType="back" onIconClick={() => {}}>
        ООО
      </Header>
      {showIf(
        [PageType.CAR, PageType.TRIP_INFO].some(value => value === pageNumber),
        <div className={'trip-creation__back-icon'} onClick={() => setPageNumber(pageNumber - 1)} />
      )}
      {showIf(
        pageNumber === PageType.FROM,
        <Input
          form={'trip-creation'}
          id={'trip-creation-from'}
          placeholderText={'Откуда едете?'}
          placeholderType={'default'}
          icon={<div className={'trip-creation__input-icon'} />}
          className={'trip-creation_bottom'}
        />
      )}
      {showIf(pageNumber === PageType.CAR, <Cars />)}
      {showIf(pageNumber === PageType.TRIP_INFO, <TripInfo />)}
      <Dialog hide={pageNumber !== PageType.CREATED} onClose={() => setPageNumber(PageType.FROM)}>
        Запрос на присоединение к поездке отправлен. Ответ водителя будет направлен вам по push-уведомлению
      </Dialog>
    </div>
  );
};
