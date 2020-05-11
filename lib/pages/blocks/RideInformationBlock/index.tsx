import React, { Fragment } from 'react';
import { TripInfo } from 'components/TripInfo/TripInfo';
import { Slider } from 'components/Slider';
import { GoBackArrow } from 'components/GoBackArrow';
import './RideInformationBlock.scss';
import { IRideCreationInfo } from 'domain/ride';

interface IRideInformationBlock {
  visible: boolean;
  rideInfo: IRideCreationInfo;
  onCreateRide: () => void;
  onSeatsNumberChange: (placeNumber: string) => void;
  onPriceChange: (cost: string) => void;
  onDateChange: (timestamp: number) => void;
  onGoBack: () => void;
}

export const RideInformationBlock = ({
  visible,
  rideInfo,
  onCreateRide,
  onPriceChange,
  onSeatsNumberChange,
  onDateChange,
  onGoBack
}: IRideInformationBlock) => {
  return (
    <Fragment>
      {visible && <GoBackArrow className="ride-information-block__back-arrow" onGoBack={onGoBack} />}
      <Slider visible={visible} from="bottom" timeout={600} unmountOnExit>
        <TripInfo
          rideInfo={rideInfo}
          onButtonClick={onCreateRide}
          onPriceChange={onPriceChange}
          onSeatsNumberChange={onSeatsNumberChange}
          onDateChange={onDateChange}
        />
      </Slider>
    </Fragment>
  );
};
