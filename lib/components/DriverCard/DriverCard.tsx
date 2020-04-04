import React from 'react';
import { Avatar } from '../Avatar/Avatar';
import { DriverAnswerType } from 'pages/ActiveRidesPage';
import { IRide } from 'domain/ride';
import { parseLocationAddress } from 'helpers/parseLocationAddress';
import { sampleAvatarSrc } from 'samples/samples';
import './DriverCard.scss';

interface IDriverCard {
  ride: IRide;
  onSelectRide: (rideId: number) => void;
  driverAnswer?: DriverAnswerType;
  waiting: boolean;
  shadowed?: boolean;
}

export const DriverCard = ({
  ride: { id, host, price, freeSeats, startOrganizationAddress, stopAddress, car, submitDatetime },
  driverAnswer,
  onSelectRide,
  shadowed = false
}: IDriverCard) => {
  const onCardClick = () => {
    onSelectRide(id);
  };
  return (
    <div
      onClick={onCardClick}
      className={`driver-card ${shadowed ? 'driver-card--shadowed' : ''} ${driverAnswer ? 'driver-card_waiting' : ''}`}
    >
      <div className={'driver-card__avatar'}>
        <Avatar src={sampleAvatarSrc} size={'medium'} mark={host.rating} />
      </div>
      <div className={'driver-card__text-container'}>
        <b>
          {host.firstName}&nbsp;{host.lastName}
        </b>
        <i>Могу взять еще {freeSeats} человек</i>
        <span className={'driver-card__text'}>
          <b>{car.model}</b>
        </span>
        {/* Нужно будет прояснить что делать со временем */}
        {/* <span className={'driver-card__text'}>
          Время отправления:&nbsp;<b>{submitDatetime}</b>
        </span> */}
      </div>

      <span className={'driver-card__price'}>{price.toFixed(0)}&nbsp;₽</span>
      <div className={`driver-card__destination ${driverAnswer ? 'driver-card__destination_waiting' : null}`}>
        <span className="driver-card__host-name">{host.firstName} едет до:</span>
        <span className="driver-card__stop-address">{parseLocationAddress(stopAddress).name}</span>
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
