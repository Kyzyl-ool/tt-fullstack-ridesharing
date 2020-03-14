import React, { useState } from 'react';
import { ITripCard, TripCard } from '../../components/TripCard/TripCard';
import { BaseLayer } from '../../components/BaseLayer/BaseLayer';
import { DriverCard } from '../../components/DriverCard/DriverCard';
import './FoundTrips.scss';

interface IFoundTrips {
  trips: ITripCard[];
}

export const FoundTrips: React.FC<IFoundTrips> = ({ trips }) => {
  const [selectedTrip, setSelectedTrip] = useState<number>(null);

  return (
    <div>
      {typeof selectedTrip === 'number' ? (
        <TripCard {...trips[selectedTrip]} onBack={() => setSelectedTrip(null)} />
      ) : null}
      {typeof selectedTrip === 'number' ? null : (
        <BaseLayer type={'secondary'} header={<span>Предложенные поездки</span>} className={'no-flex'}>
          {trips.map((value, index) => (
            <div key={index} onClick={() => setSelectedTrip(index)}>
              <DriverCard
                key={index}
                avatarSrc={value.driver.avatarSrc}
                mark={value.driver.mark}
                vacations={value.driver.vacations}
                time={value.time}
                secondName={value.driver.secondName}
                firstName={value.driver.firstName}
                destination={value.to}
                cost={value.cost}
                car={value.driver.car}
                tripId={value.tripId}
                waiting={false}
              />
            </div>
          ))}
        </BaseLayer>
      )}
    </div>
  );
};
