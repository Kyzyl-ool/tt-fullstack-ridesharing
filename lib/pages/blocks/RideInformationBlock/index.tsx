import React, { Fragment } from 'react';
import { TripInfo } from 'components/TripInfo/TripInfo';
import { Slider } from 'components/Slider';
import { GoBackArrow } from 'components/GoBackArrow';
import './RideInformationBlock.scss';

interface IRideInformationBlock {
  visible: boolean;
  onCreateRide: () => void;
  onCostChange: () => void;
  onPlaceChange: () => void;
  onGoBack: () => void;
}

export const RideInformationBlock = ({
  visible,
  onCreateRide,
  onCostChange,
  onPlaceChange,
  onGoBack
}: IRideInformationBlock) => {
  return (
    <Fragment>
      {visible && <GoBackArrow className="ride-information-block__back-arrow" onGoBack={onGoBack} />}
      <Slider visible={visible} from="bottom" timeout={600} unmountOnExit>
        <TripInfo onButtonClick={onCreateRide} onCostChange={onCostChange} onPlaceChange={onPlaceChange} />
      </Slider>
    </Fragment>
  );
};
