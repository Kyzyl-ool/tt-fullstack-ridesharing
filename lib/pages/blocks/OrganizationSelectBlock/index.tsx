import React, { Fragment, useEffect, useState } from 'react';
import _isEmpty from 'lodash/isEmpty';
import { Header } from 'components/Header';
import { Slider } from 'components/Slider';
import { LocationsList } from 'components/LocationsList';
import { NearestOrganizationLabel } from 'components/NearestOrganizationLabel';
import { ILocation } from 'domain/map';
import UserModel from 'models/UserModel';
import './OrganizationSelectBlock.scss';
import { useUserLocation } from 'hooks/mapHooks';
import { useHistory } from 'react-router-dom';

interface IOrganizationSelectBlock {
  onGoBack: () => void;
  onSelectOrganization: (location: ILocation) => void;
  visible: boolean;
}

export const OrganizationSelectBlock = ({ onGoBack, visible, onSelectOrganization }: IOrganizationSelectBlock) => {
  const [organizations, setOrganizations] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const history = useHistory();

  useUserLocation(true);

  const fetchOrganizations = async () => {
    try {
      const fetchedOrganizations = await UserModel.getOrganizations();
      setOrganizations(fetchedOrganizations);
    } catch (e) {
      throw new Error(e);
    } finally {
      setIsLoaded(true);
    }
  };

  const onAddNewOrganization = () => {
    history.push('/organization/join');
  };

  const onCreateNewOrganization = () => {
    history.push('/organization/create');
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
          <LocationsList
            locations={organizations}
            onSelectLocation={onSelectOrganization}
            withLoader
            isLoaded={isLoaded}
            onAddNewOrganization={onAddNewOrganization}
            onCreateNewOrganization={onCreateNewOrganization}
            withAdding={_isEmpty(organizations)}
          />
        </div>
      </Slider>
    </Fragment>
  );
};
