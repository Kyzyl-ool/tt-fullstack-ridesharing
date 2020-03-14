import React from 'react';
import './SearchingPage.scss';
import { BaseLayer } from 'components/BaseLayer/BaseLayer';
import { ProgressBar } from 'components/ProgressBar';
import { Button } from 'components/Button';
import { useCountUp } from 'react-countup';

interface ISearchingPage {
  from: string;
  to: string;
}

export const SearchingTrips: React.FC<ISearchingPage> = ({ from, to }) => {
  const handleCancelSearch = () => {};
  const { countUp } = useCountUp({ end: 100, duration: 3, useEasing: true });

  return (
    <div className={'waiting-card'}>
      <BaseLayer type={'primary'} header={null}>
        <div>
          <b>Поиск подходящих поездок</b>
          <br />
          <span>Это может занять некоторое время</span>
        </div>
        <ProgressBar progress={countUp / 100} />
        <Button onClick={handleCancelSearch} filled>
          Отменить поиск
        </Button>
      </BaseLayer>
    </div>
  );
};
