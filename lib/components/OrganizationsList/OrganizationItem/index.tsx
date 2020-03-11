import React from 'react';
import './OrganizationItem.scss';

interface IOrganizationItemProps {
  organizationName: string;
  organizationAddress: string;
  onSelectOrganization: () => void;
}

export const OrganizationItem = ({ organizationName, organizationAddress }: IOrganizationItemProps) => {
  return (
    <div className="organization-item__item">
      <div className="organization-item__icon"></div>
      <div className="organization-item__info">
        <p className="organization-item__name">{organizationName}</p>
        <p className="organization-item__address">{organizationAddress}</p>
      </div>
    </div>
  );
};
