import React from 'react';
import classNames from 'classnames';
import './GoBackArrow.scss';

interface IGoBackArrow {
  onGoBack: () => void;
  className: string;
}

export const GoBackArrow = ({ onGoBack, className }: IGoBackArrow) => {
  const arrowClasses = classNames({
    'go-back-arrow': true,
    [className]: true
  });

  return <div className={arrowClasses} onClick={onGoBack} />;
};
