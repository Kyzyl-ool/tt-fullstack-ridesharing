import React, { Fragment } from 'react';
import { Header } from 'components/Header';
import { Slider } from 'components/Slider';
import { LocationsList } from 'components/LocationsList';
import { NearestOrganizationLabel } from 'components/NearestOrganizationLabel';
import { organizationsListStub } from 'pages/__stubs__';
import { ILocation } from 'domain/map';
import './OrganizationSelectBlock.scss';

interface IOrganizationSelectBlock {
  onGoBack: () => void;
  onSelectOrganization: (location: ILocation) => void;
  visible: boolean;
}

export const OrganizationSelectBlock = ({ onGoBack, visible, onSelectOrganization }: IOrganizationSelectBlock) => {
  return (
    <Fragment>
      {visible && (
        <Header iconType="back" onIconClick={onGoBack}>
          <NearestOrganizationLabel onClick={() => {}} />
        </Header>
      )}
      <Slider visible={visible} from="bottom" timeout={600} unmountOnExit>
        <div className="organization-select-block__organizations-list">
          <LocationsList locations={organizationsListStub} onSelectLocation={onSelectOrganization} />
        </div>
      </Slider>
    </Fragment>
  );
};
