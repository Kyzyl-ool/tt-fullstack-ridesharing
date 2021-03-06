import React from 'react';
import { BaseLayer } from 'components/BaseLayer/BaseLayer';
import { ProgressBar } from 'components/ProgressBar';
import { Button } from 'components/Button';
import { useCountUp } from 'react-countup';
import './SearchingPage.scss';

interface ISearchingWindow {
  from: string;
  to: string;
  onCancel: () => void;
}

export const SearchingWindow: React.FC<ISearchingWindow> = ({ from, to, onCancel }) => {
  const handleCancelSearch = () => {
    onCancel();
  };
  const { countUp } = useCountUp({ end: 100, duration: 3, useEasing: true });

  return (
    <div className={'waiting-card'}>
      <BaseLayer type={'primary'} header={null}>
        <div className="waiting-card__header">
          <b className="waiting-card__main-header-part">Поиск подходящих поездок</b>
          <br />
          <span className="waiting-card__secondary-header-part">Это может занять некоторое время</span>
        </div>
        <ProgressBar progress={countUp / 100} />
        <Button onClick={handleCancelSearch} filled>
          Отменить поиск
        </Button>
      </BaseLayer>
    </div>
  );
};
