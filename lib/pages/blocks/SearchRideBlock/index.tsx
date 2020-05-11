import React, { Fragment, useEffect } from 'react';
import { Slider } from 'components/Slider';
import { SearchingWindow } from 'components/SearchingWindow';
import { useDimmedMap } from 'hooks/mapHooks';
import './SearchRideBlock.scss';

interface ISearchRideBlock {
  onShowMenu: () => void;
  visible: boolean;
  from: string;
  to: string;
  onCancelSearch: () => void;
}

export const SearchRideBlock = ({ onShowMenu, visible, from, to, onCancelSearch }: ISearchRideBlock) => {
  const [isMapDimmed, toggleDimmed] = useDimmedMap();
  useEffect(() => {
    if (visible) {
      if (!isMapDimmed) {
        toggleDimmed();
      }
    }
    return () => {
      if (isMapDimmed) {
        toggleDimmed();
      }
    };
  }, []);
  return (
    <Fragment>
      <Slider visible={visible} from="bottom" timeout={400} unmountOnExit>
        <div className="search-ride-block__searching-window">
          <SearchingWindow from={from} to={to} onCancel={onCancelSearch} />
        </div>
      </Slider>
    </Fragment>
  );
};
