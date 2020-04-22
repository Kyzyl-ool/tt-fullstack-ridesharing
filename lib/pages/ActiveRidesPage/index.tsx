import React, { useEffect, useState, Fragment } from 'react';
import { Header } from 'components/Header';
import { useHistory, Link } from 'react-router-dom';
import usePageState from 'hooks/usePageState/usePageState';
import { Button } from 'components/Button';
import { DriverCard } from 'components/DriverCard/DriverCard';
import RideModel, { IGetActiveRidesResponseBodyEntry, IHostedRideResponseBodyEntry } from 'models/RideModel';
import { useSelector } from 'react-redux';
import { IRide, IHostAnswer } from 'domain/ride';
import { RideCard } from 'components/RideCard';
import './ActiveRidesPage.scss';
import { CenteredLoader } from 'components/CenteredLoader';

type Tabs = 'I_AM_DRIVER' | 'I_AM_PASSENGER';

export type DriverAnswerType = 'ACCEPT' | 'DECLINE' | 'WAITING' | 'CANCELLED';

export const ActiveRidesPage: React.FC = props => {
  const history = useHistory();
  const [pageState, setNext, setPrev, renderWithState] = usePageState(['MY_RIDES', 'RIDE_CARD']);
  const [currentTab, setCurrentTab] = useState<Tabs>('I_AM_PASSENGER');
  const [activeRides, setActiveRides] = useState<IRide[]>([]);
  const [activeHostedRides, setActiveHostedRides] = useState<IRide[]>([]);
  const [selectedRide, setSelectedRide] = useState<IRide>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleBack = () => {
    if (pageState === 'MY_RIDES') {
      history.push('/');
    } else {
      setPrev();
    }
  };

  const handleNext = selectedRideId => {
    // TODO REMOVE STRANGE ASSIGNMENT AFTER BUG WITH startOrganizationAddress will be FIXED
    const selectedRide = [...activeRides, ...activeHostedRides].find(ride => ride.id === selectedRideId);
    selectedRide['startOrganizationAddress'] = selectedRide['startOrganization'].address;
    selectedRide['passengers'] = [];
    setSelectedRide(selectedRide);
    setNext();
  };

  const getActiveRides = async () => {
    setActiveRides(await RideModel.activeRides());
    setActiveHostedRides(await RideModel.rideHosted());
  };

  useEffect(() => {
    getActiveRides();
    setIsLoaded(true);
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
            <Button
              className="active-rides-page__navigation-button"
              filled={currentTab === 'I_AM_DRIVER'}
              onClick={() => setCurrentTab('I_AM_DRIVER')}
            >
              Вы водитель
            </Button>
            <Button
              className="active-rides-page__navigation-button"
              filled={currentTab === 'I_AM_PASSENGER'}
              onClick={() => setCurrentTab('I_AM_PASSENGER')}
            >
              Вы пассажир
            </Button>
          </div>
          {isLoaded ? (
            <div className={'active-rides-page'}>
              {currentTab === 'I_AM_PASSENGER' &&
                activeRides.map(ride => (
                  <DriverCard
                    onSelectRide={handleNext}
                    ride={ride}
                    driverAnswer={ride.hostAnswer}
                    key={ride.id}
                    waiting
                    shadowed
                  />
                ))}
              {currentTab === 'I_AM_DRIVER' &&
                activeHostedRides.map(ride => (
                  <DriverCard key={ride.id} ride={ride} onSelectRide={handleNext} shadowed waiting={false} />
                ))}
            </div>
          ) : (
            <CenteredLoader />
          )}
        </div>
      )}
      {renderWithState(
        'RIDE_CARD',
        <Fragment>
          <div className="active-rides-page__container">
            <RideCard
              renderCustomHostButton={() => (
                <Link to={`/ride/${selectedRide.id}/requests`}>
                  <Button className="active-rides-page__requests-button" onClick={() => {}} filled>
                    Посмотреть запросы
                  </Button>
                </Link>
              )}
              ride={selectedRide}
              onBack={handleBack}
              onButtonClick={() => {}}
            />
          </div>
        </Fragment>,
        'slideBottom'
      )}
    </div>
  );
};
