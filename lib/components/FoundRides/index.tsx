import React, { useState } from 'react';
import { RideCard } from 'components/RideCard';
import { BaseLayer } from 'components/BaseLayer/BaseLayer';
import { DriverCard } from 'components/DriverCard/DriverCard';
import { Slider } from 'components/Slider';
import { IRide } from 'domain/ride';
import './FoundRides.scss';
import { GoBackArrow } from 'components/GoBackArrow';

interface IFoundRides {
  rides: IRide[];
  onSendRequest: () => void;
  onSelectRide: (rideId: number) => void;
  onGoBack: () => void;
}

export const FoundRides: React.FC<IFoundRides> = ({ rides, onSendRequest, onSelectRide, onGoBack }) => {
  const [selectedRideIndex, setSelectedRideIndex] = useState<number>(null);
  const [selected, setSelected] = useState<boolean>(false);

  const onBackArrowClick = () => {
    if (selected) {
      // return to list of rides
      setSelected(false);
    } else {
      onGoBack();
    }
  };

  return (
    <div>
      <GoBackArrow onGoBack={onBackArrowClick} className="found-rides__back-arrow" />
      <Slider visible={selected} timeout={900} unmountOnExit from={'bottom'}>
        <div className="found-rides__container">
          <RideCard onSendRequest={onSendRequest} ride={rides[selectedRideIndex]} onBack={() => setSelected(false)} />
        </div>
      </Slider>
      <Slider visible={!selected} timeout={900} unmountOnExit from={'bottom'}>
        <div className="found-rides__container">
          <BaseLayer type={'secondary'} header={<span>Предложенные поездки</span>} className={'no-flex'}>
            <div className="found-rides__rides">
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
            </div>
          </BaseLayer>
        </div>
      </Slider>
    </div>
  );
};
