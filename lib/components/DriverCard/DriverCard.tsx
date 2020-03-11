import React from 'react';
import { Avatar } from '../Avatar/Avatar';
import './DriverCard.scss';

interface ITripCard {
  avatarSrc: string;
  mark: number;
  firstName: string;
  secondName: string;
  vacations: number;
  car: string;
  time: string;
  destination: string;
  cost: number;
  tripId: number;
  waiting?: boolean;
}

export const DriverCard: React.FC<ITripCard> = ({
  avatarSrc,
  mark,
  firstName,
  secondName,
  vacations,
  car,
  time,
  cost,
  destination,
  tripId,
  waiting
}) => {
  return (
    <div className={`driver-card ${waiting ? 'driver-card_waiting' : ''}`}>
      <div className={'driver-card__avatar'}>
        <Avatar src={avatarSrc} size={'medium'} mark={mark} />
      </div>
      <div className={'driver-card__text-container'}>
        <b>
          {firstName}&nbsp;{secondName}
        </b>
        <i>Могу взять еще {vacations} человек</i>
        <span className={'driver-card__text'}>
          Автомобиль:&nbsp;<b>{car}</b>
        </span>
        <span className={'driver-card__text'}>
          Время отправления:&nbsp;<b>{time}</b>
        </span>
      </div>

      <span className={'driver-card__price'}>{cost.toFixed(0)}&nbsp;₽</span>
      <div className={`driver-card__destination ${waiting ? 'driver-card__destination_waiting' : null}`}>
        <span>{firstName} едет до:</span>
        <span>{destination}</span>
      </div>

      {waiting ? <span className={'driver-card__waiting'}>Ожидание ответа водителя</span> : null}
    </div>
  );
};
