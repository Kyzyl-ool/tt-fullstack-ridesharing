import React, { useState } from 'react';
import usePageState from '../../hooks/usePageState';
import './Auth.scss';
import { BaseLayer } from 'components/BaseLayer/BaseLayer';
import { Button } from 'components/Button';
import { Input } from 'components/Input';
import { Backdrop } from 'components/Backdrop';
import { Header } from 'components/Header';
import { NearestOrganizationLabel } from 'components/NearestOrganizationLabel';
import { Dialog } from 'components/Dialog/Dialog';
import { useHistory } from 'react-router-dom';

export const Auth: React.FC = props => {
  const [pageState, setNext, setPrev, renderForState] = usePageState(['BEGIN', 'ENTER_PHONE', 'SMS_CODE']);
  const [phoneNumber, setPhoneNumber] = useState<string>();
  const [smsCode, setSmsCode] = useState<string>();
  const [waiting, setWaiting] = useState<boolean>(false);
  const history = useHistory();

  const handlePhoneNumber = async () => {};
  const handleSmsCode = async () => {};

  const handleNext = async () => {
    setWaiting(true);
    switch (pageState) {
      case 'ENTER_PHONE': {
        await handlePhoneNumber();
        break;
      }
      case 'SMS_CODE': {
        await handleSmsCode();
        history.push('/welcome');
        break;
      }
      default:
        break;
    }
    setNext();
    setWaiting(false);
  };

  return (
    <div className={'auth-page'}>
      <div className={'auth-page__background'} />
      <h1 className={'auth-page__brand'}>RideSharing</h1>
      {renderForState(
        'BEGIN',
        <BaseLayer type={'primary'} header={<>Авторизоваться</>} className={'auth-page__base-layer'}>
          <Button onClick={handleNext} filled>
            По номеру телефона
          </Button>
        </BaseLayer>
      )}
      {renderForState(
        'ENTER_PHONE',
        <BaseLayer type={'primary'} header={<>Авторизоваться по номеру телефона</>} className={'auth-page__base-layer'}>
          <Input id={'phone-number'} placeholderText={'Номер телефона'} onChange={value => setPhoneNumber(value)} />
          <Button onClick={handleNext} filled disabled={waiting}>
            {waiting ? 'Ожидание...' : 'Подтвердить'}
          </Button>
        </BaseLayer>
      )}
      {renderForState(
        'SMS_CODE',
        <BaseLayer type={'primary'} header={<>Введите код, высланный по СМС</>} className={'auth-page__base-layer'}>
          <Input id={'sms-code'} placeholderText={'Код'} onChange={value => setSmsCode(value)} />
          <Button onClick={handleNext} filled disabled={waiting}>
            {waiting ? 'Ожидание...' : 'Подтвердить'}
          </Button>
        </BaseLayer>
      )}
      <span className={'auth-page__authors'}>
        Кежик Кызыл-оол, Никита Израилев, Алексей Кожарин
        <br />
        Технотрек 2020
      </span>
    </div>
  );
};
