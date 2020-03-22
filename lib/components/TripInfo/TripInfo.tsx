// eslint-disable-next-line @typescript-eslint/no-empty-function
import React, { useState } from 'react';
import { BaseLayer } from 'components/BaseLayer/BaseLayer';
import { Input } from 'components/Input';
import { Button } from 'components/Button';

interface ITripInfo {
  onButtonClick: () => void;
  onPlaceChange: () => void;
  onCostChange: () => void;
}

export const TripInfo = ({ onButtonClick }: ITripInfo) => {
  const [text, setText] = useState<string>('Создать поездку');
  const [btnDisabled, setBtnDisabled] = useState<boolean>(false);
  const handleClick = () => {
    setText('Создание поездки...');
    setBtnDisabled(true);
    onButtonClick();
  };

  return (
    <BaseLayer type="secondary" header="Введите информацию о поездке">
      <Input placeholderType="subscript" id="places" placeholderText="Кол-во посадочных мест" />
      <Input placeholderType="subscript" id="cost" placeholderText="Стоимость поездки" />
      <Button disabled={btnDisabled} onClick={handleClick}>
        {text}
      </Button>
    </BaseLayer>
  );
};
