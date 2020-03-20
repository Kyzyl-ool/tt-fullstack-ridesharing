import React, { useState } from 'react';
import { ITripCard, TripCard } from 'components/TripCard/TripCard';
import { BaseLayer } from 'components/BaseLayer/BaseLayer';
import { DriverCard } from 'components/DriverCard/DriverCard';
import { Slider } from 'components/Slider';
import './FoundTrips.scss';

interface IFoundTrips {
  trips: ITripCard[];
  onSendRequest: () => void;
}

export const FoundTrips: React.FC<IFoundTrips> = ({ trips, onSendRequest }) => {
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
            {trips.map((value, index) => (
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
        </div>
      </Slider>
    </div>
  );
};
