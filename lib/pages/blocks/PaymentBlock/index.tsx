import React from 'react';
import { AmountToPay } from 'components/AmountToPay';
import { WayToPay } from 'components/WayToPay';
import { Button } from 'components/Button';
import './PaymentBlock.scss';

interface IPaymentBlock {
  amountToPay: number;
  onPaymentConfirmed: () => void;
}

export const PaymentBlock: React.FC<IPaymentBlock> = ({ amountToPay, onPaymentConfirmed }) => {
  const handleClick = () => {
    onPaymentConfirmed();
  };

  return (
    <>
      <div className={'payment-block'}>
        <AmountToPay amount={amountToPay} />
        <span className={'payment-block__caption'}>Текущий способ оплаты</span>
        <WayToPay />
        <Button onClick={handleClick} filled className={'payment-block__button'}>
          Подтвердить
        </Button>
      </div>
    </>
  );
};
