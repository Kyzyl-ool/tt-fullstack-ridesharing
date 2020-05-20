import React, { useState } from 'react';
import classNames from 'classnames';
import './RateUnit.scss';

type availableColors = 'red' | 'yellow' | 'green';
type colorMapper = (rate: number) => availableColors;

interface IRateUnitProps {
  rate: number;
  className?: string;
  selected?: boolean;
  customColorMapper?: colorMapper;
  onClick: (rating: number) => void;
}

const defaultColorMapper: colorMapper = rate => {
  if (rate > 0 && rate < 4) {
    return 'red';
  }
  if (rate >= 4 && rate < 7) {
    return 'yellow';
  }
  if (rate >= 7) {
    return 'green';
  }
};

export const RateUnit = ({
  rate,
  className = '',
  customColorMapper = null,
  selected = false,
  onClick
}: IRateUnitProps) => {
  const rateToColor: colorMapper = rate => {
    if (!customColorMapper) {
      return defaultColorMapper(rate);
    }
  };
  const onRateSelect = () => {
    onClick(rate);
  };
  const classes = classNames({
    'rate-unit': true,
    [`rate-unit--${rateToColor(rate)}`]: true,
    'rate-unit--selected': selected,
    [className]: true
  });
  return (
    <div onClick={onRateSelect} className={classes}>
      {rate}
    </div>
  );
};
