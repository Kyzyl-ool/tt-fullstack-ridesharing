import React, { useState, useEffect } from 'react';
import _isEmpty from 'lodash/isEmpty';
import classNames from 'classnames';
import { Marker } from 'react-map-gl';
import Loader from 'react-loader-spinner';
import { OrganizationModel } from 'models/OrganizationModel';
import { parseLocationAddress } from 'helpers/parseLocationAddress';
import { ILocation, IDestination } from 'domain/map';
import { IOrganization } from 'domain/organization';
import './OrganizationMarker.scss';

interface IOrganizationMarker {
  organization: ILocation & IDestination;
}

export const OrganizationMarker = ({ organization }: IOrganizationMarker) => {
  const [isTooltipShown, setIsTooltipShown] = useState(false);
  const [organizationInfo, setOrganizationInfo] = useState<IOrganization>({});
  const [isFetched, setIsFetched] = useState(false);
  const tooltipClasses = classNames({
    'organization-marker__tooltip': true,
    'organization-marker__tooltip--visible': isTooltipShown
  });
  const onClick = () => {
    setIsTooltipShown(!isTooltipShown);
  };

  useEffect(() => {
    const getOrganization = async () => {
      try {
        setIsFetched(false);
        const fetchedInfo = await OrganizationModel.get(organization.id);
        setOrganizationInfo(fetchedInfo.data);
      } catch (e) {
        throw new Error(e);
      } finally {
        setIsFetched(true);
      }
    };
    if (isTooltipShown) {
      getOrganization();
    }
  }, [isTooltipShown]);

  const renderTooltip = () => {
    if (!isFetched) {
      return (
        <div className="organization-marker__loader">
          <Loader height={50} width={50} color="#e8f6e8" type="Oval" />
        </div>
      );
    } else if (!_isEmpty(organizationInfo)) {
      return (
        <div>
          <p className="organization-marker__info-name">{organizationInfo.name}</p>
          <p className="organization-marker__info-address">
            Адрес: {parseLocationAddress(organizationInfo.address).name}
          </p>
          <p className="organization-marker__info-participants">Участников: {organizationInfo.totalMembers}</p>
        </div>
      );
    } else {
      return <p>К сожалению, не удалось загрузить данные об организации</p>;
    }
  };

  return (
    <Marker
      latitude={parseFloat(organization.gps.latitude)}
      longitude={parseFloat(organization.gps.longitude)}
      key={organization.name}
    >
      <div onClick={onClick} className="organization-marker">
        <div className="organization-marker__icon" />
        <p className="organization-marker__name">{organization.name}</p>
        <div className={tooltipClasses}>{renderTooltip()}</div>
      </div>
    </Marker>
  );
};
