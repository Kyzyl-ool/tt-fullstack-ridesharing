import React from 'react';
import usePageState from '../../hooks/usePageState';
import './Auth.scss';

export const Auth: React.FC = props => {
  const pageState = usePageState([
    {
      key: 'BEGIN'
    },
    {
      key: 'ENTER_PHONE'
    },
    {
      key: 'ENTER_PHONE_WAITING'
    },
    {
      key: 'SMS_CODE'
    },
    {
      key: 'SMS_CODE_WAITING'
    },
    {
      key: 'WELCOME_NAME'
    },
    {
      key: 'WELCOME_TELEGRAM'
    },
    {
      key: 'FINISH'
    }
  ]);

  return (
    <div className={'auth-page'}>
      <div className={'auth-page__background'} />
      <h1>RideSharing</h1>
      <span>
        Кежик Кызыл-оол, Никита Израилев, Алексей Кожарин
        <br />
        Технотрек 2020
      </span>
    </div>
  );
};
