import React, { useState } from 'react';
import { ITripCard, TripCard } from 'components/TripCard/TripCard';
import { BaseLayer } from 'components/BaseLayer/BaseLayer';
import { DriverCard } from 'components/DriverCard/DriverCard';
import { Slider } from 'components/Slider';
import './FoundTrips.scss';

interface IFoundTrips {
  trips: ITripCard[];
  onSendRequest: () => void;
  onSelectRide: (rideId: string) => void;
}

export const FoundTrips: React.FC<IFoundTrips> = ({ trips, onSendRequest, onSelectRide }) => {
  const [selectedTripIndex, setSelectedTripIndex] = useState<number>(null);
  const [selected, setSelected] = useState<boolean>(false);

  return (
    <div>
      <Slider visible={selected} timeout={900} unmountOnExit from={'bottom'}>
        <div className="found-trips__container">
          <TripCard onSendRequest={onSendRequest} {...trips[selectedTripIndex]} onBack={() => setSelected(false)} />
        </div>
      </Slider>
      <Slider visible={!selected} timeout={900} unmountOnExit from={'bottom'}>
        <div className="found-trips__container">
          <BaseLayer type={'secondary'} header={<span>Предложенные поездки</span>} className={'no-flex'}>
            {trips.map((trip, index) => (
              <div
                key={index}
                onClick={() => {
                  setSelectedTripIndex(index);
                  setSelected(true);
                }}
                style={{ width: '100%' }}
              >
                <DriverCard
                  key={index}
                  avatarSrc={trip.driver.avatarSrc}
                  mark={trip.driver.mark}
                  vacations={trip.driver.vacations}
                  time={trip.time}
                  secondName={trip.driver.secondName}
                  firstName={trip.driver.firstName}
                  destination={trip.to}
                  cost={trip.cost}
                  car={trip.driver.car}
                  tripId={trip.tripId}
                  onSelectRide={onSelectRide}
                  waiting={false}
                />
              </div>
            ))}
          </BaseLayer>
        </div>
      </Slider>
    </div>
  );
};
