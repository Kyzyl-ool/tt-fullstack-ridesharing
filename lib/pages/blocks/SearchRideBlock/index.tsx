import React, { Fragment } from 'react';
import { Header } from 'components/Header';
import { Slider } from 'components/Slider';
import { SearchingWindow } from 'components/SearchingWindow';
import './SearchRideBlock.scss';

interface ISearchRideBlock {
  onShowMenu: () => void;
  visible: boolean;
  from: string;
  to: string;
}

export const SearchRideBlock = ({ onShowMenu, visible, from, to }: ISearchRideBlock) => {
  return (
    <Fragment>
      {visible && (
        <Header iconType="menu" onIconClick={onShowMenu}>
          <div className="search-ride-block__header-text">Поиск</div>
        </Header>
      )}
      <Slider visible={visible} from="bottom" timeout={400} unmountOnExit>
        <div className="search-ride-block__searching-window">
          <SearchingWindow from={from} to={to} />
        </div>
      </Slider>
    </Fragment>
  );
};
