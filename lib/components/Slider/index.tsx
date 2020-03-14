import React, { ReactNode } from 'react';
import classNames from 'classnames';
import { CSSTransition } from 'react-transition-group';
import './Slider.scss';

type SlideDirection = 'bottom' | 'top';

interface ISliderProps {
  children: ReactNode;
  showCondition: boolean;
  timeout: number;
  unmountOnExit: boolean;
  from?: SlideDirection;
}

export const Slider = ({ showCondition, timeout, children, unmountOnExit, from }: ISliderProps) => {
  const sliderClassNames = classNames({
    [from === 'bottom' ? 'rsh-slider-bottom' : 'rsh-slider-top']: true
  });
  return (
    <div onBlur={() => console.log('click outside')}>
      <CSSTransition classNames={sliderClassNames} in={showCondition} timeout={timeout} unmountOnExit={unmountOnExit}>
        {children}
      </CSSTransition>
    </div>
  );
};
