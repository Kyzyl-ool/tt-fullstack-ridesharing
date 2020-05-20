import React, { useEffect, useState } from 'react';
import { DoneRide } from 'components/DoneRide';
import { Header } from 'components/Header';
import { useHistory } from 'react-router-dom';
import RideModel from 'models/RideModel';
import { IHistoryRide } from 'domain/ride';
import './RidesHistory.scss';

export const RidesHistoryPage: React.FC = props => {
  const history = useHistory();
  const [ridesHistory, setRidesHistory] = useState<IHistoryRide[]>([]);

  const handleBack = () => {
    history.push('/');
  };

  const fetchRidesHistory = async () => {
    const res = await RideModel.rideHistory();
    setRidesHistory(res);
  };

  useEffect(() => {
    fetchRidesHistory();
  }, []);

  return (
    <div>
      <Header iconType={'back'} onIconClick={handleBack}>
        История поездок
      </Header>
      <div className={'rides-history-page'}>
        {ridesHistory.map(ride => (
          <DoneRide key={ride.id} ride={ride} />
        ))}
        {ridesHistory.length === 0 ? (
          <span className={'rides-history-page__no-rides-text'}>У вас пока не было поездок</span>
        ) : null}
      </div>
    </div>
  );
};
