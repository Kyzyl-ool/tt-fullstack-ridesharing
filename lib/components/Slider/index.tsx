import React, { ReactNode } from 'react';
import classNames from 'classnames';
import { CSSTransition } from 'react-transition-group';
import './Slider.scss';

type SlideDirection = 'bottom' | 'top';

interface ISliderProps {
  children: ReactNode;
  visible: boolean;
  timeout: number;
  unmountOnExit: boolean;
  from?: SlideDirection;
}

export const Slider = ({ visible, timeout, children, unmountOnExit, from }: ISliderProps) => {
  const sliderClassNames = classNames({
    [from === 'bottom' ? 'rsh-slider-bottom' : 'rsh-slider-top']: true
  });
  return (
    <div className="rsh-slider-container">
      <CSSTransition classNames={sliderClassNames} in={visible} timeout={timeout} unmountOnExit={unmountOnExit}>
        {children}
      </CSSTransition>
    </div>
  );
};
