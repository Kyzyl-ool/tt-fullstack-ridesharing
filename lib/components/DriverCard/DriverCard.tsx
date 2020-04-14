import React from 'react';
import { Avatar } from '../Avatar/Avatar';
import { DriverAnswerType } from 'pages/ActiveRidesPage';
import { IRide, IHostAnswer } from 'domain/ride';
import { parseLocationAddress } from 'helpers/parseLocationAddress';
import { sampleAvatarSrc } from 'samples/samples';
import './DriverCard.scss';

interface IDriverCard {
  ride: IRide;
  onSelectRide: (rideId: number) => void;
  driverAnswer?: IHostAnswer;
  waiting: boolean;
  shadowed?: boolean;
}

export const DriverCard = ({
  ride: { id, host, price, freeSeats, startOrganizationAddress, hostAnswer, stopAddress, car, submitDatetime },
  onSelectRide,
  shadowed = false
}: IDriverCard) => {
  const onCardClick = () => {
    onSelectRide(id);
  };
  return (
    <div
      onClick={onCardClick}
      className={`driver-card ${shadowed ? 'driver-card--shadowed' : ''} ${hostAnswer ? 'driver-card_waiting' : ''}`}
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
      <div className={`driver-card__destination ${hostAnswer ? 'driver-card__destination_waiting' : null}`}>
        <span className="driver-card__host-name">{host.firstName} едет до:</span>
        <span className="driver-card__stop-address">{parseLocationAddress(stopAddress).name}</span>
      </div>

      {hostAnswer === 'NO ANSWER' ? <span className={'driver-card__waiting'}>Ожидание ответа водителя</span> : null}
      {/* Пока с бэкенда не приходит информация о том, что поездка отменена */}
      {/* {driverAnswer === 'CANCELLED' ? (
        <span className={'driver-card__waiting driver-card__waiting_red'}>Поездка отменена</span>
      ) : null} */}
      {hostAnswer === 'DECLINED' ? (
        <span className={'driver-card__waiting driver-card__waiting_red'}>Запрос отклонен</span>
      ) : null}
      {hostAnswer === 'ACCEPTED' ? (
        <span className={'driver-card__waiting driver-card__waiting_green'}>Запрос принят</span>
      ) : null}
    </div>
  );
};
