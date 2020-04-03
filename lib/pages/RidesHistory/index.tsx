import React, { useEffect, useState } from 'react';
import './RidesHistory.scss';
import { DoneRide } from 'components/DoneRide';
import { Header } from 'components/Header';
import { useHistory } from 'react-router-dom';
import RideModel, { IGetRidesHistoryResponseBodyEntry } from 'models/RideModel';

export const RidesHistoryPage: React.FC = props => {
  const history = useHistory();
  const [ridesHistory, setRidesHistory] = useState<IGetRidesHistoryResponseBodyEntry[]>([]);

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
        {ridesHistory.map(value => (
          <DoneRide
            key={value.id}
            rideId={value.id}
            driver={{
              avatarSrc: value.host.photoUrl,
              firstName: value.host.firstName,
              lastName: value.host.lastName
            }}
            from={value.startOrganizationName}
            to={value.stopAddress}
            date={value.submitDatetime}
            cost={value.price}
          />
        ))}
        {ridesHistory.length === 0 ? (
          <span className={'rides-history-page__no-rides-text'}>У вас пока не было поездок</span>
        ) : null}
      </div>
    </div>
  );
};
