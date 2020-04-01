import React from 'react';
import { Avatar } from 'components/Avatar/Avatar';
import { sampleAvatarSrc } from 'samples/samples';
import { DotIcon, MapPointIcon } from '../../icons';
import { format } from 'date-fns';
import ruLocale from 'date-fns/locale/ru';
import './DoneRide.scss';
import { Button } from 'components/Button';

interface IDoneRide {
  rideId: number;
  rateId?: string;
  driver: {
    firstName: string;
    lastName: string;
    avatarSrc: string;
  };
  from: string;
  to: string;
  date: string; //ISO
  cost: number;
}

export const DoneRide: React.FC<IDoneRide> = props => {
  const makeRate = () => {};

  return (
    <div className={'done-ride-card shadowed'}>
      <div className={'done-ride-card__left-side'}>
        <div className={'flex-row'}>
          <Avatar src={sampleAvatarSrc} size={'small'} className={'margins'} />
          <div className={'flex-column flex-column_center'}>
            <span className={'caption'}>Водитель</span>
            <b className={'driver-name'}>
              {props.driver.firstName}&nbsp;{props.driver.lastName}
            </b>
          </div>
        </div>
        <span className={'flex-row'}>
          <DotIcon size={'small'} />
          <span className={'from-to-string'}>{props.from}</span>
        </span>
        <span className={'flex-row'}>
          <MapPointIcon size={'small'} />
          <span className={'from-to-string'}>{props.to}</span>
        </span>
      </div>
      <div className={'done-ride-card__divider'} />
      <div className={'done-ride-card__right-side flex-column flex-column_center flex-column_space-evenly'}>
        <span className={'date-label'}>
          {`${format(new Date(props.date), 'do MMM', { locale: ruLocale })}`}&nbsp;
          {`${format(new Date(props.date), 'HH:mm', { locale: ruLocale })}`}
        </span>
        {props.rateId ? (
          <u className={'u-button'} onClick={makeRate}>
            Просмотреть отзыв
          </u>
        ) : (
          <Button onClick={makeRate} outlined>
            Оставить отзыв
          </Button>
        )}
        <span className={'ride-cost-label'}>Стоимость поездки</span>
        <b className={'ride-cost-label-numbers'}>{props.cost}₽</b>
      </div>
    </div>
  );
};
