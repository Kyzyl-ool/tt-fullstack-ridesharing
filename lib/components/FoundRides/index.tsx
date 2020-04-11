import React, { useState } from 'react';
import { RideCard } from 'components/RideCard';
import { BaseLayer } from 'components/BaseLayer/BaseLayer';
import { DriverCard } from 'components/DriverCard/DriverCard';
import { Slider } from 'components/Slider';
import { IRide } from 'domain/ride';
import './FoundRides.scss';

interface IFoundRides {
  rides: IRide[];
  onSendRequest: () => void;
  onSelectRide: (rideId: number) => void;
}

export const FoundRides: React.FC<IFoundRides> = ({ rides, onSendRequest, onSelectRide }) => {
  const [selectedRideIndex, setSelectedRideIndex] = useState<number>(null);
  const [selected, setSelected] = useState<boolean>(false);

  return (
    <div>
      <Slider visible={selected} timeout={900} unmountOnExit from={'bottom'}>
        <div className="found-rides__container">
          <RideCard onSendRequest={onSendRequest} ride={rides[selectedRideIndex]} onBack={() => setSelected(false)} />
        </div>
      </Slider>
      <Slider visible={!selected} timeout={900} unmountOnExit from={'bottom'}>
        <div className="found-rides__container">
          <BaseLayer type={'secondary'} header={<span>Предложенные поездки</span>} className={'no-flex'}>
            {rides.map((ride, index) => (
              <div
                key={index}
                onClick={() => {
                  setSelectedRideIndex(index);
                  setSelected(true);
                }}
                style={{ width: '100%' }}
              >
                <DriverCard key={index} ride={ride} onSelectRide={onSelectRide} waiting={false} />
              </div>
            ))}
          </BaseLayer>
        </div>
      </Slider>
    </div>
  );
};