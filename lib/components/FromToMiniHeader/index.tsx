import React from 'react';
import './FromToMiniHeader.scss';

interface IFromToMiniHeader {
  from: string;
  to: string;
}

export const FromToMiniHeader: React.FC<IFromToMiniHeader> = ({ from, to }) => {
  return (
    <div className={'from-to-mini-header'}>
      <span>{from}</span>
      <div className={'right-arrow'} />
      <span>{to}</span>
    </div>
  );
};
