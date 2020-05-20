import React, { useEffect, useState } from 'react';
import { DoneRide } from 'components/DoneRide';
import { Header } from 'components/Header';
import { useHistory } from 'react-router-dom';
import RideModel from 'models/RideModel';
import { IHistoryRide } from 'domain/ride';
import { Button } from 'components/Button';
import './RidesHistory.scss';
import { RateUnit } from 'components/RateUnit';
import { Dialog } from 'components/Dialog';

const rates = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const badRates = [1, 2, 3];
const okRates = [4, 5, 6];
const goodRates = [7, 8];
const excelentRates = [9, 10];

const rateMap = rate => {
  if (!rate) {
    return { message: 'Ваша оценка', color: 'default' };
  }
  if (badRates.includes(rate)) {
    return { message: 'Плохо', color: 'red' };
  }
  if (okRates.includes(rate)) {
    return { message: 'Нормально', color: 'yellow' };
  }
  if (goodRates.includes(rate)) {
    return { message: 'Хорошо', color: 'green' };
  }
  if (excelentRates.includes(rate)) {
    return { message: 'Отлично', color: 'dark-green' };
  }
};

export const RidesHistoryPage: React.FC = props => {
  const [isRateWindowShown, setIsRateWindowShown] = useState(false);
  const [selectedRideId, setSelectedRideId] = useState(null);
  const [rating, setRating] = useState(null);
  const [message, setMessage] = useState(null);
  const history = useHistory();
  const [ridesHistory, setRidesHistory] = useState<IHistoryRide[]>([]);

  const handleBack = () => {
    history.push('/');
  };

  const fetchRidesHistory = async () => {
    const res = await RideModel.rideHistory();
    setRidesHistory(res);
  };

  const onRate = (rideId: number) => {
    setIsRateWindowShown(true);
    setSelectedRideId(rideId);
  };

  const onConfirm = async () => {
    try {
      await RideModel.rateRide(rating, selectedRideId);
      setMessage('Поездка успешно оценена');
    } catch (e) {
      setMessage('К сожалению, произошла ошибка');
      throw new Error(e);
    }
  };

  const selectRating = (selectedRating: number) => {
    setRating(selectedRating);
  };

  useEffect(() => {
    fetchRidesHistory();
  }, []);

  const onCloseDialog = () => {
    history.push('/ride/history');
    setIsRateWindowShown(false);
    setMessage('');
    setRating(null);
  };

  const rateDisplayInfo = rateMap(rating);

  return (
    <div>
      <Header iconType={'back'} onIconClick={handleBack}>
        История поездок
      </Header>
      <div className={'rides-history-page'}>
        {ridesHistory.map(ride => (
          <DoneRide key={ride.id} ride={ride} onRate={onRate} />
        ))}
        {ridesHistory.length === 0 ? (
          <span className={'rides-history-page__no-rides-text'}>У вас пока не было поездок</span>
        ) : null}
      </div>
      {isRateWindowShown && (
        <div className="rides-history-page__rate-window">
          <p className="rides-history-page__header">Оцените поездку по шкале от 1 (плохо) до 10 (отлично)</p>
          <p className={`rides-history-page__rating-word rides-history-page__rating-word--${rateDisplayInfo.color}`}>
            {rateDisplayInfo.message}
          </p>
          <div className="rides-history-page__good-rates">
            {[...goodRates, ...excelentRates].map(rate => (
              <RateUnit onClick={selectRating} key={rate} rate={rate} selected={rate === rating} />
            ))}
          </div>

          <div className="rides-history-page__ok-rates">
            {okRates.map(rate => (
              <RateUnit onClick={selectRating} key={rate} rate={rate} selected={rate === rating} />
            ))}
          </div>
          <div className="rides-history-page__bad-rates">
            {badRates.map(rate => (
              <RateUnit onClick={selectRating} key={rate} rate={rate} selected={rate === rating} />
            ))}
          </div>
          <Button disabled={!rating} onClick={onConfirm} filled>
            Подтвердить
          </Button>
        </div>
      )}

      <Dialog className="rides-history-page__dialog" hide={!message} onClose={onCloseDialog}>
        <h3 className="rides-history-page__dialog-header">Оценка</h3>
        <p className="rides-history-page__text">{message}</p>
      </Dialog>
    </div>
  );
};
