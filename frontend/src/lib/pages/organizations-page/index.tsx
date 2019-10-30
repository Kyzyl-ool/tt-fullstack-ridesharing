import React, { useEffect, useState } from 'react';
import { IOrganizationCardProps, OrganizationItem } from '../../components/OrganizationItem/OrganizationItem';
import { Box, Button, Container } from '@material-ui/core';
import NewOrganizationCard from '../../components/OrganizationCard/NewOrganizationCard';
import { connect } from 'react-redux';
import { IOrganization } from '../../domain/organization';
import OrganizationsModel from '../../models/organizationsModel';
import * as actions from '../../store/actions';

interface IOrganizationPageProps {
  organizations: IOrganization[];
}

const UnconnectedOrganizationPage: React.FC<IOrganizationPageProps> = ({ organizations }) => {
  const [addingNew, setAddingNew] = useState(false);
  const data: IOrganizationCardProps[] =
    organizations &&
    organizations.length &&
    organizations.map(value => {
      return {
        name: value.name,
        address: `${value.latitude}`, // todo: incorrect
        id: +value.id
      };
    });

  return (
    <div>
      {data && data.length && data.map((value, index) => <OrganizationItem key={index} {...value} />)}
      {addingNew && <NewOrganizationCard organizations={organizations} />}
      <Button variant={'text'} color={'primary'} onClick={() => setAddingNew(true)}>
        Присоединиться к новой организации
      </Button>
    </div>
  );
};

export const OrganizationPage = connect(
  null,
  null
)(UnconnectedOrganizationPage);
