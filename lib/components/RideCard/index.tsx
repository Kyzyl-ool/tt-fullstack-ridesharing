import React, { useState } from 'react';
import { BaseLayer } from '../BaseLayer/BaseLayer';
import { Avatar } from '../Avatar/Avatar';
import { sampleAvatarSrc } from '../../samples/samples';
import { Button } from '../Button';
import { CSSTransition } from 'react-transition-group';
import { UserCard } from '../UserCard';
import { IRide } from 'domain/ride';
import { parseLocationAddress } from 'helpers/parseLocationAddress';
import './RideCard.scss';

export interface IRideCard {
  ride: IRide;
  onBack: () => void;
  onSendRequest: () => void;
}

export const RideCard = ({ ride, onBack, onSendRequest }: IRideCard) => {
  const [show, setShow] = useState<boolean>(false);
  const handleRequest = () => {
    onSendRequest();
  };

  return (
    <BaseLayer
      type={'headed'}
      header={
        <div className={'ride-card-header'}>
          <span className={'ride-card-header__icon ride-card-header__icon_back'} onClick={onBack} />
          <div className={'ride-card-aligner'}>
            <span className={'ride-card-header__icon ride-card-header__icon_dot'} />
            <span className={'ride-card-header__destinations'}>
              {parseLocationAddress(ride.startOrganizationAddress).name}
            </span>
          </div>
          <div className={'ride-card-aligner'}>
            <span className={'ride-card-header__icon ride-card-header__icon_geo'} />
            <span className={'ride-card-header__destinations'}>{parseLocationAddress(ride.stopAddress).name}</span>
          </div>
        </div>
      }
    >
      <div className={`ride-card-passengers ${show ? 'ride-card-passengers_showed' : ''}`}>
        {ride.passengers.map((value, index) => (
          <UserCard
            key={index}
            avatarSrc={sampleAvatarSrc}
            mark={value.rating}
            name={`${value.firstName} ${value.lastName}`}
          />
        ))}
      </div>
      <CSSTransition in={show} timeout={300} classNames={'onopen'}>
        <div className={'ride-card-main-container'}>
          {show ? (
            <u className={'ride-card-participants-button'} onClick={() => setShow(false)}>
              Свернуть
            </u>
          ) : null}
          <div className={'ride-card-content'}>
            <div className={'ride-card-content_horizontal'}>
              <div className={'ride-card-avatar-and-info'}>
                <div className={'ride-card-content_margin-8'}>
                  <Avatar src={sampleAvatarSrc} size={'small'} mark={ride.host.rating} />
                </div>
                <div>
                  <b>
                    {ride.host.firstName}&nbsp;{ride.host.lastName}
                  </b>
                  <br />
                  <b>{ride.car.model}</b>
                  <br />
                  <span>Свободных мест:&nbsp;</span>
                  <b>{ride.freeSeats}</b>
                </div>
              </div>
              <div className={'ride-card-content_vertical'}>
                <div>
                  <span>Время отправления:</span>
                  <br />
                  {/* <b>{ride.submitDatetime}</b> */}
                  <b>По договоренности</b>
                </div>
                <u onClick={() => setShow(true)} className={'ride-card-participants-button'}>
                  Пассажиров:&nbsp;<b>{ride.passengers.length}</b>
                </u>
              </div>
            </div>
          </div>
          <div className={'ride-card-content_horizontal'}>
            <div className={'ride-cost'}>
              <span className={'ride-cost__label'}>Стоимость&nbsp;поездки</span>
              <span className={'ride-cost__cost'}>{ride.price}&nbsp;₽</span>
            </div>
          </div>
          <Button onClick={handleRequest} filled={true} className={'ride-card-send-button'}>
            Отправить запрос
          </Button>
        </div>
      </CSSTransition>
    </BaseLayer>
  );
};