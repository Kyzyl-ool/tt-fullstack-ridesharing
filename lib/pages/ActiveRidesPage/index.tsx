import React, { useState } from 'react';
import './ActiveRidesPage.scss';
import { Header } from 'components/Header';
import { useHistory } from 'react-router-dom';
import usePageState from '../../hooks/usePageState';
import { Button } from 'components/Button';
import { DriverCard } from 'components/DriverCard/DriverCard';
import { sampleAvatarSrc } from 'samples/samples';
import { IRide } from 'domain/ride';

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
  const [activeRides, setActiveRides] = useState<IRide[]>([
    {
      host: {
        id: 14,
        firstName: 'Алексей',
        lastName: 'Кожарин',
        phoneNumber: '+79665557788',
        photoUrl: sampleAvatarSrc,
        rating: 7
      },
      submitDatetime: '17:00',
      freeSeats: 3,
      car: {
        id: 22,
        owner: 14,
        model: 'Toyota Camry',
        registryNumber: 'у564ук',
        color: 'Красный'
      },
      price: 130,
      startOrganizationAddress: 'Mail.ru Corp',
      stopAddress: 'Дикси продуктовый магазин',
      id: 1,
      passengers: [
        {
          photoUrl: sampleAvatarSrc,
          firstName: 'Иван',
          lastName: 'Ивванов',
          rating: 8,
          id: 2
        },
        {
          photoUrl: sampleAvatarSrc,
          firstName: 'Иван',
          lastName: 'Ивванов',
          rating: 7,
          id: 4
        },
        {
          photoUrl: sampleAvatarSrc,
          firstName: 'Иван',
          lastName: 'Ивванов',
          rating: 3,
          id: 3
        }
      ]
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
            {activeRides.map((ride, index) => (
              <DriverCard
                onSelectRide={() => {}}
                ride={ride}
                driverAnswer={props.driverAnswer || 'WAITING'}
                key={ride.id}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
