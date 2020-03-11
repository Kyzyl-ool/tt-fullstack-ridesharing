import React from 'react';
import { OrganizationItem } from './OrganizationItem';

type IOrganization = {
  name: string;
  address: string;
};

interface IOrganizationList {
  organizations: IOrganization[];
  onSelectOrganization: () => void;
}

const OrganizationList = ({ organizations, onSelectOrganization }) => {
  return (
    <div className="organization-list__wrapper">
      <p className="organization-list__text"></p>
      <ul className="organization-list__list">
        {organizations.map(organization => (
          <li key={organization.name}>
            <OrganizationItem
              onSelectOrganization={onSelectOrganization}
              organizationName={organization.name}
              organizationAddress={organization.address}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
