import React, { Fragment } from 'react';
import { TripInfo } from 'components/TripInfo/TripInfo';
import { Slider } from 'components/Slider';
import { GoBackArrow } from 'components/GoBackArrow';
import { IRideCreationInfo } from 'domain/ride';
import { isLaptopMatchMedia, isPadMatchMedia } from 'helpers/matchers';
import { Header } from 'components/Header';
import './RideInformationBlock.scss';
import './RideInformationBlock.desktop.scss';

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
  const isDesktop = isLaptopMatchMedia();
  const isTab = isPadMatchMedia();

  return (
    <Fragment>
      {visible && (isTab || isDesktop) && <Header>Информация о поездке</Header>}
      {visible && <GoBackArrow className="ride-information-block__back-arrow" onGoBack={onGoBack} />}
      <div className="ride-information-block">
        <Slider visible={visible} from="bottom" timeout={600} unmountOnExit>
          <TripInfo
            rideInfo={rideInfo}
            onButtonClick={onCreateRide}
            onPriceChange={onPriceChange}
            onSeatsNumberChange={onSeatsNumberChange}
            onDateChange={onDateChange}
          />
        </Slider>
      </div>
    </Fragment>
  );
};
