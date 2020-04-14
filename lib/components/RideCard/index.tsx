import React, { useState } from 'react';
import parseISO from 'date-fns/parseISO';
import { BaseLayer } from '../BaseLayer/BaseLayer';
import { Avatar } from '../Avatar/Avatar';
import { sampleAvatarSrc } from '../../samples/samples';
import { Button } from '../Button';
import { CSSTransition } from 'react-transition-group';
import { UserCard } from '../UserCard';
import { IRide, IHostAnswer } from 'domain/ride';
import { parseLocationAddress } from 'helpers/parseLocationAddress';
import './RideCard.scss';
import { useSelector } from 'react-redux';

export interface IRideCard {
  ride: IRide;
  onBack: () => void;
  onButtonClick: (hostAnswerType: IHostAnswer) => void;
}

export const RideCard = ({ ride, onBack, onButtonClick }: IRideCard) => {
  const [show, setShow] = useState<boolean>(false);
  const userInfo = useSelector(state => state.user.user);
  const handleClick = (hostAnswerType: IHostAnswer) => {
    onButtonClick(hostAnswerType);
  };

  const renderButton = (hostAnswerType: IHostAnswer, isHost: boolean) => {
    const commonProps = {
      onClick: () => handleClick(hostAnswerType),
      className: 'ride-card-send-button',
      filled: true
    };
    if (isHost) {
      return (
        <Button {...commonProps} disabled>
          Это ваша поездка
        </Button>
      );
    }
    switch (hostAnswerType) {
      case 'ACCEPTED':
        return (
          <Button disabled {...commonProps}>
            Вы уже в поездке
          </Button>
        );
      case 'DECLINED':
        return (
          <Button disabled {...commonProps}>
            Заявка отклонена
          </Button>
        );
      case 'NO ANSWER':
        return (
          <Button disabled {...commonProps}>
            Ожидание ответа водителя
          </Button>
        );
      default:
        return <Button {...commonProps}>Отправить запрос</Button>;
    }
  };
  return (
    <BaseLayer
      type={'headed'}
      header={
        <div className={'ride-card-header'}>
          <span className={'ride-card-header__icon ride-card-header__icon_back'} onClick={onBack} />
          <div className="ride-card-header__container">
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
                  <b>
                    {new Date(ride.startDatetime).toLocaleDateString('ru-RU', {
                      month: 'long',
                      day: 'numeric',
                      hour: 'numeric',
                      minute: 'numeric',
                      hour12: false
                    })}
                  </b>
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
          {renderButton(ride.hostAnswer, userInfo.id === ride.host.id)}
        </div>
      </CSSTransition>
    </BaseLayer>
  );
};
