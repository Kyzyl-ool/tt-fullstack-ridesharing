import React, { useState, ReactNode } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { BaseLayer } from '../BaseLayer/BaseLayer';
import { Avatar } from '../Avatar/Avatar';
import { sampleAvatarSrc } from '../../samples/samples';
import { Button } from '../Button';
import { CSSTransition } from 'react-transition-group';
import { UserCard } from '../UserCard';
import { IRide, IHostAnswer } from 'domain/ride';
import { parseLocationAddress } from 'helpers/parseLocationAddress';
import { useSelector } from 'react-redux';
import { Dialog } from 'components/Dialog';
import RideModel from 'models/RideModel';
import './RideCard.scss';

export interface IRideCard {
  ride: IRide;
  onBack: () => void;
  onButtonClick: (hostAnswerType: IHostAnswer) => void;
  renderCustomHostButton?: () => ReactNode;
}

export const RideCard = ({ ride, onBack, onButtonClick, renderCustomHostButton = null }: IRideCard) => {
  const [show, setShow] = useState<boolean>(false);
  const [isHostInfoShown, setIsHostInfoShown] = useState<boolean>(false);
  const [isSuccessCancelanceShown, setIsSuccessCancelanceShown] = useState<boolean>(false);
  const [isSuccessFinishShown, setIsSuccessFinishShown] = useState<boolean>(false);
  const [isRejectReasonShown, setIsRejectReasonShown] = useState<boolean>(false);
  const userInfo = useSelector(state => state.user.user);
  const history = useHistory();
  const handleClick = (hostAnswerType: IHostAnswer) => {
    onButtonClick(hostAnswerType);
  };

  const showHostInfo = () => {
    setIsHostInfoShown(true);
  };

  const showSuccessCancelance = () => {
    setIsSuccessCancelanceShown(true);
    history.push('/');
  };

  const showSuccessFinish = () => {
    setIsSuccessFinishShown(true);
    history.push('/');
  };

  const showRejectReason = () => {
    setIsRejectReasonShown(true);
  };

  const onCloseHostInfo = () => {
    setIsHostInfoShown(false);
  };

  const onCloseRejectReason = () => {
    setIsRejectReasonShown(false);
  };

  const onCloseFinishDialog = () => {
    setIsSuccessFinishShown(false);
  };

  const onCloseCancelDialog = () => {
    setIsSuccessCancelanceShown(false);
  };

  const onCancelRide = async () => {
    try {
      await RideModel.cancelRide(ride.id);
      showSuccessCancelance();
    } catch (e) {
      throw new Error(e);
    }
  };

  const onFinishRide = async () => {
    try {
      await RideModel.finishRide(ride.id);
      showSuccessFinish();
    } catch (e) {
      throw new Error(e);
    }
  };

  const renderButton = (hostAnswerType: IHostAnswer, isHost: boolean) => {
    const commonProps = {
      onClick: () => handleClick(hostAnswerType),
      className: 'ride-card-send-button',
      filled: true
    };
    if (isHost) {
      if (renderCustomHostButton) {
        return renderCustomHostButton();
      }
      return (
        <Button {...commonProps} disabled>
          Это ваша поездка
        </Button>
      );
    }
    switch (hostAnswerType) {
      case 'ACCEPTED':
        return (
          <Button {...commonProps} onClick={showHostInfo}>
            Контактные данные
          </Button>
        );
      case 'DECLINED':
        return (
          <Button {...commonProps} onClick={showRejectReason}>
            Запрос отклонен
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
                <Link to={`/user/${ride.host.id}`}>
                  <div className={'ride-card-content_margin-8'}>
                    <Avatar src={sampleAvatarSrc} size={'small'} mark={ride.host.rating} />
                  </div>
                </Link>
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
          {userInfo.id === ride.host.id && (
            <div className="ride-card__host-buttons">
              <div onClick={onFinishRide} className="ride-card__secondary-button ride-card__secondary-button--finish">
                <div className="ride-card__finish-button-icon" />
                Завершить
              </div>
              <div onClick={onCancelRide} className="ride-card__secondary-button ride-card__secondary-button--cancel">
                <div className="ride-card__cancel-button-icon" />
                Отменить
              </div>
            </div>
          )}
        </div>
      </CSSTransition>
      <Dialog className="ride-card__dialog" hide={!isHostInfoShown} onClose={onCloseHostInfo} withConfirmButton={false}>
        <div className="ride-card__text">Водитель оставил Вам свои контактные данные для связи:</div>
        <Button filled>{ride.host.phoneNumber}</Button>
      </Dialog>
      <Dialog
        className="ride-card__dialog"
        hide={!isRejectReasonShown}
        onClose={onCloseRejectReason}
        withConfirmButton={false}
      >
        <p className="ride-card__text">Запрос был отклонен. Водитель пишет: {ride.declineReason}</p>
      </Dialog>
      <Dialog
        className="ride-card__dialog"
        hide={!isSuccessCancelanceShown}
        onClose={onCloseCancelDialog}
        // withConfirmButton={false}
      >
        <p className="ride-card__text">Поездка успешно отклонена!</p>
      </Dialog>
      <Dialog className="ride-card__dialog" hide={!isSuccessFinishShown} onClose={onCloseFinishDialog}>
        <p className="ride-card__text">Поездка успешно завершена!</p>
      </Dialog>
    </BaseLayer>
  );
};
