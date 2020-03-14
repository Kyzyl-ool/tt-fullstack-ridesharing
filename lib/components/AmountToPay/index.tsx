import React from 'react';
import './AmountToPay.scss';

interface IAmountToPay {
  amount: number;
}

export const AmountToPay: React.FC<IAmountToPay> = ({ amount }) => {
  return (
    <div className={'amount-to-pay'}>
      <div className={'amount-to-pay__amount'}>{amount}</div>
      <div className={'amount-to-pay__caption'}>Сумма к оплате</div>
    </div>
  );
};
