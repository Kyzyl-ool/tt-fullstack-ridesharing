import React, { Fragment, useState } from 'react';
import { Header } from 'components/Header';
import { Slider } from 'components/Slider';
import { Input } from 'components/Input';
import { DestinationsList } from 'components/DestinationsList';
import { IDestination } from 'domain/map';
import './DestinationSelectBlock.scss';
import MapModel from 'models/MapModel';

interface IDestinationSelectBlock {
  onGoBack: () => void;
  onSelectDestination: (gps: IDestination['gps']) => void;
  startOrganizationName: string;
  visible: boolean;
}

export const DestinationSelectBlock = ({
  onGoBack,
  visible,
  onSelectDestination,
  startOrganizationName
}: IDestinationSelectBlock) => {
  const [matchedDestinations, setMatchedDestinations] = useState([]);

  const onDestinationSearch = async (value: string) => {
    const destinations = await MapModel.forwardGeocoding(value);
    setMatchedDestinations(destinations);
  };

  return (
    <Fragment>
      {visible && (
        <Header iconType="back" onIconClick={onGoBack}>
          Укажите пункт назначения
        </Header>
      )}
      <Slider visible={visible} from="top" timeout={400} unmountOnExit>
        <div>
          <div className="destination-select-block__input-form">
            <Input
              id="departure"
              defaultValue={startOrganizationName}
              className="destination-select-block__input"
              placeholderText=""
              icon={<div className="destination-select-block__input-icon--from" />}
            />
            <Input
              id="arrival"
              className="destination-select-block__input"
              placeholderText=""
              icon={<div className="destination-select-block__input-icon--to" />}
              onChange={onDestinationSearch}
            />
          </div>
          <div className="destination-select-block__destinations-list">
            <DestinationsList text="" destinations={matchedDestinations} onSelectDestination={onSelectDestination} />
          </div>
        </div>
      </Slider>
    </Fragment>
  );
};
