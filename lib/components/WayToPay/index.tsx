import React from 'react';
import './WayToPay.scss';

export const WayToPay: React.FC = props => {
  return (
    <div className={'way-to-pay'}>
      <div className={'way-to-pay__payment-icon'} />
      <div>
        <b>Оплата наличными водителю</b>
        <br />
        <span>Способ оплаты по умолчанию</span>
      </div>
    </div>
  );
};
