import React, { Fragment } from 'react';
import { Header } from 'components/Header';
import { Slider } from 'components/Slider';
import { LocationsList } from 'components/LocationsList';
import { Input } from 'components/Input';
import { locationsListStub } from 'pages/__stubs__';
import './DestinationSelectBlock.scss';

interface IDestinationSelectBlock {
  onGoBack: () => void;
  onSelectDestination: () => void;
  visible: boolean;
}

export const DestinationSelectBlock = ({ onGoBack, visible, onSelectDestination }: IDestinationSelectBlock) => {
  return (
    <Fragment>
      {visible && (
        <Header iconType="back" onIconClick={onGoBack}>
          <div className="destination-select-block__header-text">Укажите пункт назначения</div>
        </Header>
      )}
      <Slider visible={visible} from="top" timeout={400} unmountOnExit>
        <div>
          <div className="destination-select-block__input-form">
            <Input
              id="departure"
              defaultValue="Mail.ru Corp."
              className="destination-select-block__input"
              placeholderText=""
              icon={<div className="destination-select-block__input-icon--from" />}
            />
            <Input
              id="arrival"
              className="destination-select-block__input"
              placeholderText=""
              icon={<div className="destination-select-block__input-icon--to" />}
            />
          </div>
          <div className="destination-select-block__destinations-list">
            <LocationsList text="" locations={locationsListStub} onSelectLocation={onSelectDestination} />
          </div>
        </div>
      </Slider>
    </Fragment>
  );
};
