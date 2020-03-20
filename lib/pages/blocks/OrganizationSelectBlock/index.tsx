import React, { Fragment } from 'react';
import { Header } from 'components/Header';
import { Slider } from 'components/Slider';
import { LocationsList } from 'components/LocationsList';
import { NearestOrganizationLabel } from 'components/NearestOrganizationLabel';
import { organizationsListStub } from 'pages/__stubs__';
import './OrganizationSelectBlock.scss';

interface IOrganizationSelectBlock {
  onGoBack: () => void;
  nearestOrganizationName: string;
  onSelectOrganization: () => void;
  visible: boolean;
}

export const OrganizationSelectBlock = ({
  onGoBack,
  visible,
  onSelectOrganization,
  nearestOrganizationName
}: IOrganizationSelectBlock) => {
  return (
    <Fragment>
      {visible && (
        <Header iconType="back" onIconClick={onGoBack}>
          <div className="organization-select-block__organization-label">
            <NearestOrganizationLabel nearestOrganizationName={nearestOrganizationName} onClick={() => {}} />
          </div>
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
