import React, { useState } from 'react';
import _isEmpty from 'lodash/isEmpty';
import { RideCard } from 'components/RideCard';
import { BaseLayer } from 'components/BaseLayer/BaseLayer';
import { DriverCard } from 'components/DriverCard/DriverCard';
import { Slider } from 'components/Slider';
import { IRide, IHostAnswer } from 'domain/ride';
import { GoBackArrow } from 'components/GoBackArrow';
import './FoundRides.scss';
import { Button } from 'components/Button';
import { useHistory } from 'react-router-dom';

interface IFoundRides {
  rides: IRide[];
  onSendRequest: () => void;
  onSelectRide: (rideId: number) => void;
  onGoBack: () => void;
}

export const FoundRides: React.FC<IFoundRides> = ({ rides, onSendRequest, onSelectRide, onGoBack }) => {
  const [selectedRideIndex, setSelectedRideIndex] = useState<number>(null);
  const [selected, setSelected] = useState<boolean>(false);
  const history = useHistory();

  const onBackArrowClick = () => {
    if (selected) {
      // return to list of rides
      setSelected(false);
    } else {
      onGoBack();
    }
  };

  const onReturnToSearch = () => {
    history.push('/ride/join');
  };

  return (
    <div>
      <GoBackArrow onGoBack={onBackArrowClick} className="found-rides__back-arrow" />
      <Slider visible={selected} timeout={900} unmountOnExit from={'bottom'}>
        <div className="found-rides__container">
          <RideCard
            onButtonClick={onSendRequest}
            ride={{
              ...rides[selectedRideIndex],
              organization: { address: rides[selectedRideIndex] && rides[selectedRideIndex].organizationAddress }
            }}
            onBack={() => setSelected(false)}
          />
        </div>
      </Slider>
      <Slider visible={!selected} timeout={900} unmountOnExit from={'bottom'}>
        <div className="found-rides__container">
          <BaseLayer type={'secondary'} header={<span>Предложенные поездки</span>} className={'no-flex'}>
            <div className="found-rides__rides">
              {!_isEmpty(rides) ? (
                rides.map((ride, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      setSelectedRideIndex(index);
                      setSelected(true);
                    }}
                    style={{ width: '100%' }}
                  >
                    <DriverCard
                      key={index}
                      ride={{ ...ride, organization: { address: ride.organizationAddress } }}
                      onSelectRide={onSelectRide}
                      waiting={false}
                    />
                  </div>
                ))
              ) : (
                <div className="found-rides__empty-options">
                  <p className="found-rides__placeholder">
                    К сожалению, ближайщих поездок не найдено. Пожалуйста, попробуйте поискать поездки в другой
                    организации
                  </p>
                  <Button onClick={onBackArrowClick}>Вернуться к поиску</Button>
                </div>
              )}
            </div>
          </BaseLayer>
        </div>
      </Slider>
    </div>
  );
};
