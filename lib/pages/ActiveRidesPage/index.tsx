import React, { useState } from 'react';
import './ActiveRidesPage.scss';
import { Backdrop } from 'components/Backdrop';
import { Header } from 'components/Header';
import { useHistory } from 'react-router-dom';
import usePageState from '../../hooks/usePageState';
import { Button } from 'components/Button';
import { TripInfo } from 'pages/_CreateRidePage/5/TripInfo';
import { FoundTrips } from 'components/FoundTrips';
import { DriverCard } from 'components/DriverCard/DriverCard';
import { sampleAvatarSrc } from 'samples/samples';

type Tabs = 'I_AM_DRIVER' | 'I_AM_PASSENGER';

export type DriverAnswerType = 'ACCEPT' | 'DECLINE' | 'WAITING' | 'CANCELLED';

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

export const ActiveRidesPage: React.FC = props => {
  const history = useHistory();
  const [pageState, setNext, setPrev, renderWithState] = usePageState(['MY_RIDES', 'RIDE_CARD']);
  const [currentTab, setCurrentTab] = useState<Tabs>('I_AM_PASSENGER');
  const [activeRides, setActiveRides] = useState<Ride[]>([
    {
      driverAnswer: 'ACCEPT',
      driver: {
        avatarSrc: sampleAvatarSrc,
        rating: 10,
        lastName: 'Izrailev',
        firstName: 'Nikita',
        driverId: 123
      },
      amountOfFreePlaces: 1,
      time: '17:00',
      destinationAddress: 'Mail.ru Corp.',
      declineReason: null,
      cost: '300',
      car: {
        color: 'black',
        licensePlateNumber: 'TY777T',
        model: 'Mazda'
      },
      rideId: 1,
      driverPhoneNumber: '89299329297'
    }
  ]);

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
          <div>
            {activeRides.map((value, index) => (
              <DriverCard
                tripId={value.rideId}
                car={`${value.car.model}, ${value.car.licensePlateNumber} (${value.car.color})`}
                cost={+value.cost}
                destination={value.destinationAddress}
                firstName={value.driver.firstName}
                secondName={value.driver.lastName}
                time={value.time}
                vacations={+value.amountOfFreePlaces}
                mark={value.driver.rating}
                avatarSrc={value.driver.avatarSrc}
                driverAnswer={value.driverAnswer}
                key={index}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
