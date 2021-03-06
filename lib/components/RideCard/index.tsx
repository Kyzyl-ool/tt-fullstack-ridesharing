import React, { useState, ReactNode, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { BaseLayer } from '../BaseLayer/BaseLayer';
import { Avatar } from '../Avatar/Avatar';
import { sampleAvatarSrc } from '../../samples/samples';
import { Button } from '../Button';
import { CSSTransition } from 'react-transition-group';
import { UserCard } from '../UserCard';
import { IRide, IHostAnswer } from 'domain/ride';
import { parseLocationAddress } from 'helpers/parseLocationAddress';
import { useSelector, useDispatch } from 'react-redux';
import { Dialog } from 'components/Dialog';
import RideModel from 'models/RideModel';
import './RideCard.scss';
import MapModel from 'models/MapModel';
import { setLineAction, resetAllLinesAction, setPointAction, resetAllPointsAction } from 'store/actions/mapActions';
import { parseISO, parse, isBefore } from 'date-fns';

export interface IRideCard {
  ride: IRide;
  onBack: () => void;
  onButtonClick: (hostAnswerType: IHostAnswer) => void;
  renderCustomHostButton?: () => ReactNode;
}

export const RideCard = ({
  ride,
  ride: {
    organization,
    address,
    id: rideId,
    fromOrganization,
    host,
    passengers,
    hostAnswer,
    declineReason,
    car,
    freeSeats,
    startDatetime,
    price
  },
  onBack,
  onButtonClick,
  renderCustomHostButton = null
}: IRideCard) => {
  const [show, setShow] = useState<boolean>(false);
  const [isHostInfoShown, setIsHostInfoShown] = useState<boolean>(false);
  const [isSuccessCancelanceShown, setIsSuccessCancelanceShown] = useState<boolean>(false);
  const [isSuccessFinishShown, setIsSuccessFinishShown] = useState<boolean>(false);
  const [isRejectReasonShown, setIsRejectReasonShown] = useState<boolean>(false);
  const [finishWarning, setFinishWarning] = useState<string>('');
  const [cancelWarning, setCancelWarning] = useState<string>('');
  const userInfo = useSelector(state => state.user.user);
  const history = useHistory();
  const dispatch = useDispatch();
  const handleClick = (hostAnswerType: IHostAnswer) => {
    onButtonClick(hostAnswerType);
  };

  const showHostInfo = () => {
    setIsHostInfoShown(true);
  };

  const showSuccessCancelance = () => {
    setIsSuccessCancelanceShown(true);
  };

  const showSuccessFinish = () => {
    setIsSuccessFinishShown(true);
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

  const onDone = () => {
    setIsRejectReasonShown(false);
    setIsSuccessCancelanceShown(false);
    history.push('/ride/active');
  };

  const onCloseFinishDialog = () => {
    setIsSuccessFinishShown(false);
    history.push('/ride/active');
  };

  const onCloseCancelDialog = () => {
    setIsSuccessCancelanceShown(false);
  };

  const onCancelRide = async () => {
    try {
      setCancelWarning('');
      await RideModel.cancelRide(rideId);
      showSuccessCancelance();
    } catch (e) {
      throw new Error(e);
    }
  };

  const openFinishDialog = () => {
    setFinishWarning('Вы уверены, что хотите завершить поездку');
  };

  const openCancelDialog = () => {
    setCancelWarning('Вы уверены, что хотите отменить поездку');
  };

  const closeFinishDialog = () => {
    setFinishWarning('');
  };

  const closeCancelDialog = () => {
    setCancelWarning('');
  };

  const onFinishRide = async () => {
    try {
      setFinishWarning('');
      await RideModel.finishRide(rideId);
      showSuccessFinish();
    } catch (e) {
      throw new Error(e);
    }
  };

  const startAddress = fromOrganization ? organization.address : address;
  const stopAddress = fromOrganization ? address : organization.address;

  useEffect(() => {
    const setLine = async () => {
      const [[first], [second]] = await Promise.all([
        MapModel.forwardGeocoding(organization.address),
        MapModel.forwardGeocoding(address)
      ]);
      dispatch(setLineAction(first.gps, second.gps, 'primary'));
      dispatch(setPointAction(second.gps));
    };
    setLine();
    return () => {
      dispatch(resetAllLinesAction());
      dispatch(resetAllPointsAction());
    };
  }, [ride]);

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

  // artificially forbid to finish if current time is less than startDatetime
  const isPossibleToFinish = isBefore(parseISO(startDatetime), new Date());

  return (
    <BaseLayer
      type={'headed'}
      header={
        <div className={'ride-card-header'}>
          <span className={'ride-card-header__icon ride-card-header__icon_back'} onClick={onBack} />
          <div className="ride-card-header__container">
            <div className={'ride-card-aligner'}>
              <span className={'ride-card-header__icon ride-card-header__icon_dot'} />
              <span className={'ride-card-header__destinations'}>{parseLocationAddress(startAddress).name}</span>
            </div>
            <div className={'ride-card-aligner'}>
              <span className={'ride-card-header__icon ride-card-header__icon_geo'} />
              <span className={'ride-card-header__destinations'}>{parseLocationAddress(stopAddress).name}</span>
            </div>
          </div>
        </div>
      }
    >
      <div className={`ride-card-passengers ${show ? 'ride-card-passengers_showed' : ''}`}>
        {passengers.map((value, index) => (
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
                <Link to={`/user/${host.id}`}>
                  <div className={'ride-card-content_margin-8'}>
                    <Avatar src={host.photoUrl || sampleAvatarSrc} size={'small'} mark={host.rating} />
                  </div>
                </Link>
                <div>
                  <b>
                    {host.firstName}&nbsp;{host.lastName}
                  </b>
                  <br />
                  <b>{car.model}</b>
                  <br />
                  <span>Свободных мест:&nbsp;</span>
                  <b>{freeSeats}</b>
                </div>
              </div>
              <div className={'ride-card-content_vertical'}>
                <div>
                  <span>Время отправления:</span>
                  <br />
                  <b>
                    {new Date(startDatetime).toLocaleDateString('ru-RU', {
                      month: 'long',
                      day: 'numeric',
                      hour: 'numeric',
                      minute: 'numeric',
                      hour12: false
                    })}
                  </b>
                </div>
                {/* <u onClick={() => setShow(true)} className={'ride-card-participants-button'}>
                  Пассажиров:&nbsp;<b>{passengers.length}</b>
                </u> */}
              </div>
            </div>
          </div>
          <div className={'ride-card-content_horizontal'}>
            <div className={'ride-cost'}>
              <span className={'ride-cost__label'}>Стоимость&nbsp;поездки</span>
              <span className={'ride-cost__cost'}>{price}&nbsp;₽</span>
            </div>
          </div>
          {renderButton(hostAnswer, userInfo.id === host.id)}
          {userInfo.id === host.id && (
            <div className="ride-card__host-buttons">
              <div
                onClick={openFinishDialog}
                className={`ride-card__secondary-button ride-card__secondary-button--finish ${
                  !isPossibleToFinish ? 'ride-card__secondary-button--disabled' : ''
                }`}
              >
                <div className="ride-card__finish-button-icon" />
                Завершить
              </div>
              <div
                onClick={openCancelDialog}
                className="ride-card__secondary-button ride-card__secondary-button--cancel"
              >
                <div className="ride-card__cancel-button-icon" />
                Отменить
              </div>
            </div>
          )}
        </div>
      </CSSTransition>
      <Dialog className="ride-card__dialog" hide={!isHostInfoShown} onClose={onCloseHostInfo} withConfirmButton={false}>
        <div className="ride-card__text">Водитель оставил Вам свои контактные данные для связи:</div>
        <Button onClick={() => {}} filled>
          {host.phoneNumber}
        </Button>
      </Dialog>
      <Dialog className="ride-card__dialog" hide={!isRejectReasonShown} onClose={onDone} withConfirmButton={false}>
        <p className="ride-card__text">Запрос был отклонен. Водитель пишет: {declineReason}</p>
      </Dialog>
      <Dialog
        className="ride-card__dialog"
        hide={!isSuccessCancelanceShown}
        onClose={onDone}
        // withConfirmButton={false}
      >
        <h3 className="ride-card__dialog-header">Успех</h3>
        <p className="ride-card__text">Поездка успешно отклонена!</p>
      </Dialog>
      <Dialog className="ride-card__dialog" hide={!isSuccessFinishShown} onClose={onCloseFinishDialog}>
        <h3 className="ride-card__dialog-header">Поздравляем!</h3>
        <p className="ride-card__text">Поездка успешно завершена!</p>
      </Dialog>
      <Dialog
        withConfirmButton={false}
        className="ride-card__warning"
        hide={!finishWarning}
        onClose={closeFinishDialog}
      >
        <h3 className="ride-card__dialog-header">Предупреждение</h3>
        <p className="ride-card__text">{finishWarning}</p>
        <div className="ride-card__dialog-buttons">
          <Button onClick={closeFinishDialog}>Отмена</Button>
          <Button onClick={onFinishRide} filled>
            Завершить
          </Button>
        </div>
      </Dialog>
      <Dialog
        withConfirmButton={false}
        className="ride-card__warning"
        hide={!cancelWarning}
        onClose={closeCancelDialog}
      >
        <h3 className="ride-card__dialog-header">Предупреждение</h3>
        <p className="ride-card__text">{cancelWarning}</p>
        <div className="ride-card__dialog-buttons">
          <Button onClick={closeCancelDialog}>Отмена</Button>
          <Button onClick={onCancelRide} filled>
            Отменить
          </Button>
        </div>
      </Dialog>
    </BaseLayer>
  );
};
