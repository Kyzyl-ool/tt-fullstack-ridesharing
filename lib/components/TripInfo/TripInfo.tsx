// eslint-disable-next-line @typescript-eslint/no-empty-function
import React, { useState } from 'react';
import DatePicker, { registerLocale, setDefaultLocale } from 'react-datepicker';
import ru from 'date-fns/locale/ru';
import { BaseLayer } from 'components/BaseLayer/BaseLayer';
import { Input } from 'components/Input';
import { Button } from 'components/Button';
import './TripInfo.scss';
import 'react-datepicker/dist/react-datepicker.css';

registerLocale('ru', ru);

interface ITripInfo {
  onButtonClick: () => void;
  onSeatsNumberChange: (placeNumber: string) => void;
  onPriceChange: (cost: string) => void;
}

export const TripInfo = ({ onButtonClick, onPriceChange, onSeatsNumberChange }: ITripInfo) => {
  const [text, setText] = useState<string>('Создать поездку');
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [startDate, setStartDate] = useState<Date>();
  const handleClick = () => {
    setText('Создание поездки...');
    setBtnDisabled(true);
    onButtonClick();
  };

  const onCostInputChange = (cost: string) => {
    onPriceChange(cost);
  };

  const onPlaceNumberInputChange = (placeNumber: string) => {
    onSeatsNumberChange(placeNumber);
  };

  const onDateChange = (date: Date) => setStartDate(date);

  const CustomDateInput = ({ value, onClick }) => (
    <div onClick={onClick}>
      <Input
        className="trip-info__input"
        placeholderType="subscript"
        defaultValue={value}
        id="date"
        disabled
        placeholderText="Дата начала поездки"
        onChange={() => {}}
      />
    </div>
  );

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
        <DatePicker
          selected={startDate}
          onChange={onDateChange}
          locale="ru"
          showTimeSelect
          timeFormat="p"
          timeIntervals={15}
          dateFormat="Pp"
          timeCaption="Время"
          minDate={new Date()}
          customInput={<CustomDateInput />}
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
