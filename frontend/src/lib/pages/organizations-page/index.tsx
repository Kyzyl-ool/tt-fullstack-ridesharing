import React, { useState } from 'react';
import { IOrganizationCardProps, OrganizationItem } from '../../components/OrganizationItem/OrganizationItem';
import { Box, Button } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { NewOrganizationCard } from '../../components/OrganizationCard/NewOrganizationCard';

interface IOrganizationPageProps {
  data: IOrganizationCardProps[];
}

export const OrganizationPage: React.FC<IOrganizationPageProps> = ({ data }) => {
  const [addingNew, setAddingNew] = useState(false);
  console.log('RENDERED', data);
  return (
    <Box>
      {data.map((value, index) => (
        <OrganizationItem key={index} {...value} />
      ))}
      {addingNew && <NewOrganizationCard />}
      <NavLink to={'/new_organization'}>
        <Button variant={'text'} color={'primary'} onClick={() => setAddingNew(true)}>
          Присоединиться к новой организации
        </Button>
      </NavLink>
    </Box>
  );
};
