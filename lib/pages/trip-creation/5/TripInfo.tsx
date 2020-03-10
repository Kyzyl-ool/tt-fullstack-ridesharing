// eslint-disable-next-line @typescript-eslint/no-empty-function
import React, { useState } from 'react';
import { BaseLayer } from '../../../components/BaseLayer/BaseLayer';
import { Input } from '../../../components/Input/Input';
import { Button } from '../../../components/Button';

export const TripInfo: React.FC = () => {
  const [text, setText] = useState<string>('Создать поездку');
  const [btnDisabled, setBtnDisabled] = useState<boolean>(false);
  const handleClick = () => {
    setText('Создание поездки...');
    setBtnDisabled(true);
  };

  return (
    <BaseLayer type={'secondary'} header={'Введите информацию о поездке'}>
      <Input placeholderType={'subscript'} id={'asd'} form={'asdasd'} placeholderText={'Кол-во посадочных мест'} />
      <Input placeholderType={'subscript'} id={'asd'} form={'asdasd'} placeholderText={'Стоимость поездки'} />
      <Button disabled={btnDisabled} onClick={handleClick}>
        {text}
      </Button>
    </BaseLayer>
  );
};
