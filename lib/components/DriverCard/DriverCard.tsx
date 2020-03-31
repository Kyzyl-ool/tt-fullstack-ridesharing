import React from 'react';
import { Avatar } from '../Avatar/Avatar';
import './DriverCard.scss';
import { DriverAnswerType } from 'pages/ActiveRidesPage';

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
  tripId: string;
  driverAnswer?: DriverAnswerType;
  onSelectRide: (rideId: string) => void;
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
  driverAnswer,
  onSelectRide
}) => {
  const onCardClick = () => {
    onSelectRide(tripId);
  };

  return (
    <div onClick={onCardClick} className={`driver-card ${driverAnswer ? 'driver-card_waiting' : ''}`}>
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
      <div className={`driver-card__destination ${driverAnswer ? 'driver-card__destination_waiting' : null}`}>
        <span>{firstName} едет до:</span>
        <span>{destination}</span>
      </div>

      {driverAnswer === 'WAITING' ? <span className={'driver-card__waiting'}>Ожидание ответа водителя</span> : null}
      {driverAnswer === 'CANCELLED' ? (
        <span className={'driver-card__waiting driver-card__waiting_red'}>Поездка отменена</span>
      ) : null}
      {driverAnswer === 'DECLINE' ? (
        <span className={'driver-card__waiting driver-card__waiting_red'}>Запрос отклонен</span>
      ) : null}
      {driverAnswer === 'ACCEPT' ? (
        <span className={'driver-card__waiting driver-card__waiting_green'}>Запрос принят</span>
      ) : null}
    </div>
  );
};
