// eslint-disable-next-line @typescript-eslint/no-empty-function
import React, { useState } from 'react';
import { BaseLayer } from 'components/BaseLayer/BaseLayer';
import { Input } from 'components/Input';
import { Button } from 'components/Button';
import './TripInfo.scss';

interface ITripInfo {
  onButtonClick: () => void;
  onPlaceChange: (placeNumber: string) => void;
  onCostChange: (cost: string) => void;
}

export const TripInfo = ({ onButtonClick, onCostChange, onPlaceChange }: ITripInfo) => {
  const [text, setText] = useState<string>('Создать поездку');
  const [btnDisabled, setBtnDisabled] = useState<boolean>(false);
  const handleClick = () => {
    setText('Создание поездки...');
    setBtnDisabled(true);
    onButtonClick();
  };

  const onCostInputChange = (cost: string) => {
    onCostChange(cost);
  };

  const onPlaceNumberInputChange = (placeNumber: string) => {
    onPlaceChange(placeNumber);
  };

  return (
    <BaseLayer className="trip-info__layer" type="secondary" header="Введите информацию о поездке">
      <div className="trip-info__form">
        <Input
          className="trip-info__input"
          placeholderType="subscript"
          id="places"
          placeholderText="Кол-во посадочных мест"
          onChange={onPlaceNumberInputChange}
        />
        <Input
          className="trip-info__input"
          placeholderType="subscript"
          id="cost"
          placeholderText="Стоимость поездки"
          onChange={onCostInputChange}
        />
        <div className="trip-info__button-wrapper">
          <Button className="trip-info__button" disabled={btnDisabled} onClick={handleClick}>
            {text}
          </Button>
        </div>
      </div>
    </BaseLayer>
  );
};
