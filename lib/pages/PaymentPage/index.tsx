import React from 'react';
import { Header } from 'components/Header';
import { AmountToPay } from 'components/AmountToPay';
import { WayToPay } from 'components/WayToPay';
import './PaymentPage.scss';
import { Button } from 'components/Button';

interface IPaymentPage {
  amountToPay: number;
}

export const PaymentPage: React.FC<IPaymentPage> = ({ amountToPay, onPaymentConfirmed }) => {
  const handleClick = () => {
    onPaymentConfirmed();
  };

  return (
    <>
      <div className={'payment-page'}>
        <AmountToPay amount={amountToPay} />
        <span className={'payment-page__caption'}>Текущий способ оплаты</span>
        <WayToPay />
        <Button onClick={handleClick} filled className={'payment-page__button'}>
          Подтвердить
        </Button>
      </div>
    </>
  );
};
