import React from 'react';
import usePageState from '../../hooks/usePageState';
import './Auth.scss';

export const Auth: React.FC = props => {
  const [pageState, setNext, setPrev, renderForState] = usePageState([
    'BEGIN',
    'ENTER_PHONE',
    'ENTER_PHONE_WAITING',
    'SMS_CODE',
    'SMS_CODE_WAITING',
    'WELCOME_NAME',
    'WELCOME_TELEGRAM',
    'FINISH'
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
