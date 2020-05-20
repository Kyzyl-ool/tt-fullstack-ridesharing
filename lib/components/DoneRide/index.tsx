import React from 'react';
import { Avatar } from 'components/Avatar/Avatar';
import { sampleAvatarSrc } from 'samples/samples';
import { DotIcon, MapPointIcon } from '../../icons';
import { format } from 'date-fns';
import dateFormat from 'date-fns/format';
import ruLocale from 'date-fns/locale/ru';
import { Button } from 'components/Button';
import { parseLocationAddress } from 'helpers/parseLocationAddress';
import { IHistoryRide } from 'domain/ride';
import './DoneRide.scss';

interface IDoneRideProps {
  ride: IHistoryRide;
  rateId?: any;
}

export const DoneRide: React.FC<IDoneRideProps> = ({ ride, rateId = null }) => {
  const makeRate = () => {};
  const formatDate = dateToFormat =>
    dateFormat(new Date(dateToFormat), 'dd MMM yyyy, hh:mm', {
      locale: ruLocale
    });
  return (
    <div className={'done-ride-card shadowed'}>
      <div className={'done-ride-card__left-side'}>
        <div className={'flex-row'}>
          <Avatar src={ride.host.photoUrl} size={'small'} className={'margins'} />
          <div className={'flex-column flex-column_center'}>
            <span className={'caption'}>Водитель</span>
            <b className={'done-ride__driver-name'}>
              {ride.host.firstName}&nbsp;{ride.host.lastName}
            </b>
          </div>
        </div>
        <span className={'flex-row'}>
          <DotIcon className="done-ride__icon" size={'small'} />
          <span className={'done-ride__from-to-string'}>{parseLocationAddress(ride.organizationName).name}</span>
        </span>
        <span className={'flex-row'}>
          <MapPointIcon className="done-ride__icon" size={'small'} />
          <span className={'done-ride__from-to-string'}>{parseLocationAddress(ride.address).name}</span>
        </span>
        <span className={'flex-row'}>
          <div className={'done-ride__time-icon'} />
          <span className={'done-ride__date-label'}>{formatDate(ride.startDatetime)}&nbsp;</span>
        </span>
      </div>
      <div className={'done-ride-card__divider'} />
      <div className={'done-ride-card__right-side flex-column flex-column_center flex-column_space-evenly'}>
        {rateId ? (
          <u className={'u-button'} onClick={makeRate}>
            Просмотреть отзыв
          </u>
        ) : (
          <Button onClick={makeRate} outlined>
            <p className="done-ride__leave-review">Оставить отзыв</p>
          </Button>
        )}
        <b className={'ride-cost-label-numbers'}>{ride.price}₽</b>
      </div>
    </div>
  );
};
