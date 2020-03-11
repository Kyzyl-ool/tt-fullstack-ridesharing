import React from 'react';
import { OrganizationItem } from './OrganizationItem';
import './OrganizationList.scss';

type IOrganization = {
  name: string;
  address: string;
};

interface IOrganizationList {
  text?: string;
  organizations: IOrganization[];
  onSelectOrganization: () => void;
}

export const OrganizationsList = ({
  organizations,
  onSelectOrganization,
  text = 'Выберите организацию, от которой будет начинаться поездка:'
}: IOrganizationList) => {
  return (
    <div className="organization-list__wrapper">
      <p className="organization-list__text">{text}</p>
      <ul className="organization-list__list">
        {organizations.map(organization => (
          <li className="organization-list__item" key={organization.name}>
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
