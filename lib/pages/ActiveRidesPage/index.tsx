import React, { useEffect, useState } from 'react';
import './ActiveRidesPage.scss';
import { Header } from 'components/Header';
import { useHistory } from 'react-router-dom';
import usePageState from '../../hooks/usePageState';
import { Button } from 'components/Button';
import { DriverCard } from 'components/DriverCard/DriverCard';
import { sampleAvatarSrc } from 'samples/samples';
import { IRide } from 'domain/ride';
import RideModel, { IGetActiveRidesResponseBodyEntry } from 'models/RideModel';
import { useSelector } from 'react-redux';

type Tabs = 'I_AM_DRIVER' | 'I_AM_PASSENGER';

export type DriverAnswerType = 'ACCEPT' | 'DECLINE' | 'WAITING' | 'CANCELLED';

interface IActiveRidesPage {
  driverAnswer: DriverAnswerType;
}

type Ride = {
  rideId: number;
  time: string;
  amountOfFreePlaces: number;
  driver: {
    driverId: number;
    firstName: string;
    lastName: string;
    avatarSrc: string;
    rating: number;
  };
  cost: string;
  car: {
    model: string;
    licensePlateNumber: string;
    color: string;
  };
  destinationAddress: string;
  driverAnswer: DriverAnswerType;
  declineReason?: string;
  driverPhoneNumber?: string;
};

export const ActiveRidesPage: React.FC<IActiveRidesPage> = props => {
  const history = useHistory();
  const [pageState, setNext, setPrev, renderWithState] = usePageState(['MY_RIDES', 'RIDE_CARD']);
  const [currentTab, setCurrentTab] = useState<Tabs>('I_AM_PASSENGER');
  const [activeRides, setActiveRides] = useState<IGetActiveRidesResponseBodyEntry[]>([]);
  const userInfo = useSelector(state => state.user.user);

  const handleBack = () => {
    if (pageState === 'MY_RIDES') {
      history.push('/');
    } else {
      setPrev();
    }
  };

  const handleNext = () => {
    setNext();
  };

  const getActiveRides = async () => {
    const res = await RideModel.activeRides();
    setActiveRides(res);
  };

  useEffect(() => {
    getActiveRides();
  }, []);

  return (
    <div>
      {renderWithState(
        'MY_RIDES',
        <div>
          <Header iconType={'back'} onIconClick={handleBack}>
            Активные поездки
          </Header>
          <div className={'flex-row nav-tab'}>
            <Button filled={currentTab === 'I_AM_DRIVER'} onClick={() => setCurrentTab('I_AM_DRIVER')}>
              Вы водитель
            </Button>
            <Button filled={currentTab === 'I_AM_PASSENGER'} onClick={() => setCurrentTab('I_AM_PASSENGER')}>
              Вы пассажир
            </Button>
          </div>
          <div className={'active-rides-page'}>
            {activeRides.map(value => (
              <DriverCard
                onSelectRide={() => {}}
                ride={{
                  car: value.car,
                  freeSeats: value.freeSeats,
                  host: value.host,
                  id: value.id,
                  passengers: [], //@todo
                  price: value.price,
                  startOrganizationAddress: 'tbd', //@todo
                  stopAddress: value.stopAddress,
                  submitDatetime: value.submitDatetime
                }}
                driverAnswer={props.driverAnswer || 'WAITING'}
                key={value.id}
                waiting
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
