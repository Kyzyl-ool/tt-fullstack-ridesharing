import React, { Fragment, useEffect, useState } from 'react';
import { Header } from 'components/Header';
import { Slider } from 'components/Slider';
import { LocationsList } from 'components/LocationsList';
import { NearestOrganizationLabel } from 'components/NearestOrganizationLabel';
import { ILocation } from 'domain/map';
import UserModel from 'models/UserModel';
import './OrganizationSelectBlock.scss';

interface IOrganizationSelectBlock {
  onGoBack: () => void;
  onSelectOrganization: (location: ILocation) => void;
  visible: boolean;
}

export const OrganizationSelectBlock = ({ onGoBack, visible, onSelectOrganization }: IOrganizationSelectBlock) => {
  const [organizations, setOrganizations] = useState([]);

  const fetchOrganizations = async () => {
    const fetchedOrganizations = await UserModel.getOrganizations();
    setOrganizations(fetchedOrganizations);
  };

  useEffect(() => {
    fetchOrganizations();
  }, []);

  return (
    <Fragment>
      {visible && (
        <Header iconType="back" onIconClick={onGoBack}>
          <NearestOrganizationLabel onClick={() => {}} />
        </Header>
      )}
      <Slider visible={visible} from="bottom" timeout={600} unmountOnExit>
        <div className="organization-select-block__organizations-list">
          <LocationsList locations={organizations} onSelectLocation={onSelectOrganization} />
        </div>
      </Slider>
    </Fragment>
  );
};
