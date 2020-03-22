import React from 'react';
import { BaseLayer } from 'components/BaseLayer/BaseLayer';
import { Input } from 'components/Input';
import { Button } from 'components/Button';
import { TripInfo } from 'components/TripInfo/TripInfo';

interface IRideInformationBlock {
  onCreateRide: () => void;
  onCostChange: () => void;
  onPlaceChange: () => void;
}

const RideInformationBlock = ({ onCreateRide, onCostChange, onPlaceChange }: IRideInformationBlock) => {
  return (
    // <Slider>
    //   <TripInfo onButtonClick={onCreateRide} onCostChange={onCostChange} onPlaceChange={onPlaceChange} />
    // </Slider>
    null
  );
};
