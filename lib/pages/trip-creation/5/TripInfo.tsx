import React from 'react';
import { BaseLayer } from '../../../components/BaseLayer/BaseLayer';
import { Input } from '../../../components/Input/Input';

export const TripInfo: React.FC = () => {
  return (
    <BaseLayer type={'secondary'} header={'Введите информацию о поездке'}>
      <Input placeholderType={'subscript'} id={'asd'} form={'asdasd'} placeholderText={'Кол-во посадочных мест'} />
      <Input placeholderType={'subscript'} id={'asd'} form={'asdasd'} placeholderText={'Стоимость поездки'} />
    </BaseLayer>
  );
};
