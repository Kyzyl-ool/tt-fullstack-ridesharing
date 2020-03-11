import React, { useState } from 'react';
import { Header } from '../../components/Header';
import Cars from './4/Cars';
import { TripInfo } from './5/TripInfo';
import className from 'classnames';
import { Dialog } from '../../components/Dialog/Dialog';

enum PageType {
  FROM = 0,
  CHOOSE_ORG,
  TO,
  CAR,
  TRIP_INFO,
  CREATED
}

export const TripCreation: React.FC = props => {
  const [pageNumber, setPageNumber] = useState<PageType>(PageType.FROM);
  const [hide, setHide] = useState<boolean>(false);

  return (
    <>
      {/* eslint-disable-next-line @typescript-eslint/no-empty-function */}
      <Header iconType="back" onIconClick={() => {}}>
        ООО
      </Header>
      <Cars />
      <TripInfo />
      <Dialog hide={hide} onClose={() => setHide(true)}>
        Запрос на присоединение к поездке отправлен. Ответ водителя будет направлен вам по push-уведомлению
      </Dialog>
    </>
  );
};
