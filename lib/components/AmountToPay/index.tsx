import React from 'react';

interface IAmountToPay {
  amount: number;
}

export const AmountToPay: React.FC<IAmountToPay> = ({ amount }) => {
  return (
    <div className={'amount-to-pay'}>
      <div>{amount}</div>
      <div>Сумма к оплате</div>
    </div>
  );
};
