import React from 'react';
import { IOrganizationCardProps, OrganizationItem } from '../../components/OrganizationItem/OrganizationItem';
import { Box, Button } from '@material-ui/core';
import { NavLink } from 'react-router-dom';

interface IOrganizationPageProps {
  data: IOrganizationCardProps[];
}

export const OrganizationPage: React.FC<IOrganizationPageProps> = ({ data }) => {
  return (
    <Box>
      {data.map((value, index) => (
        <OrganizationItem key={index} {...value} />
      ))}
      <NavLink to={'/new_organization'}>
        <Button variant={'text'} color={'primary'}>
          Присоединиться к новой организации
        </Button>
      </NavLink>
    </Box>
  );
};
