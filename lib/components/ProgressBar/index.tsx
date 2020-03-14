import React from 'react';
import './ProgressBar.scss';

interface IProgressBar {
  progress: number;
}

export const ProgressBar: React.FC<IProgressBar> = ({ progress }) => {
  return (
    <div className={'progress-bar'}>
      <div className={'progress-bar__car-icon'} style={{ left: `${progress * 312}px` }} />
      <div className={'progress-bar__line progress-bar__line_filled'} style={{ width: `${progress * 312}px` }} />
      <div className={'progress-bar__line'} />
    </div>
  );
};
