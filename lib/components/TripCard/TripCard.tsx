import React from 'react';
import './TripCard.scss';
import { BaseLayer } from '../BaseLayer/BaseLayer';
import { Avatar } from '../Avatar/Avatar';
import { sampleAvatarSrc } from '../../samples/samples';
import { Button } from '../Button';

export interface IPassengerType {
  firstName: string;
  secondName: string;
  mark: number;
  id: number;
}

export interface IDriverType {
  firstName: string;
  secondName: string;
  car: string;
  vacations: number;
}

interface ITripCard {
  from: string;
  to: string;
  driver: IDriverType;
  cost: number;
  time: string;
  passengers: IPassengerType[];
  tripId: number;
}

export const TripCard: React.FC<ITripCard> = props => {
  const handleRequest = () => {};

  return (
    <BaseLayer
      type={'headed'}
      header={
        <div className={'trip-card-header'}>
          <span className={'trip-card-header__icon trip-card-header__icon_back'} />
          <div className={'trip-card-aligner'}>
            <span className={'trip-card-header__icon trip-card-header__icon_dot'} />
            <span className={'trip-card-header__destinations'}>{props.from}</span>
          </div>
          <div className={'trip-card-aligner'}>
            <span className={'trip-card-header__icon trip-card-header__icon_geo'} />
            <span className={'trip-card-header__destinations'}>{props.to}</span>
          </div>
        </div>
      }
    >
      <div className={'trip-card-content'}>
        <div className={'trip-card-content_horizontal'}>
          <span className={'trip-card-content_margin-8'}>
            <Avatar src={sampleAvatarSrc} size={'small'} mark={2.1} />
          </span>
          <div>
            <b>
              {props.driver.firstName}&nbsp;{props.driver.secondName}
            </b>
            <br />
            <span>Автомобиль:&nbsp;</span>
            <b>{props.driver.car}</b>
            <br />
            <span>Свободных мест:&nbsp;</span>
            <b>{props.driver.vacations}</b>
          </div>
          <div className={'trip-card-content_vertical'}>
            <div>
              <span>Время отправлеия:</span>
              <br />
              <b>{props.time}</b>
            </div>
            <u>
              Пассажиров:&nbsp;<b>{props.passengers.length}</b>
            </u>
          </div>
        </div>
      </div>

      <div>
        <Button onClick={handleRequest} filled={true}>
          Отправить запрос
        </Button>
      </div>
    </BaseLayer>
  );
};
