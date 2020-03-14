import React from 'react';
import { Header } from 'components/Header';
import { AmountToPay } from 'components/AmountToPay';
import { WayToPay } from 'components/WayToPay';

interface IPaymentPage {
  amountToPay: number;
}

export const PaymentPage: React.FC<IPaymentPage> = ({ amountToPay }) => {
  return (
    <div>
      <Header iconType={'back'} onIconClick={() => {}}>
        Выберите способ оплаты
      </Header>
      <AmountToPay amount={amountToPay} />
      <p>Текущий способ оплаты</p>
      <WayToPay />
    </div>
  );
};
