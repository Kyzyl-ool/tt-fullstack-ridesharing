import React, { useState } from 'react';
import { IOrganizationCardProps, OrganizationItem } from '../../components/OrganizationItem/OrganizationItem';
import { Box, Button, Typography } from '@material-ui/core';
import NewOrganizationCard from '../../components/OrganizationCard/NewOrganizationCard';
import { connect } from 'react-redux';
import { IOrganization } from '../../domain/organization';

interface IOrganizationPageProps {
  organizations: IOrganization[];
  myOrganizations: IOrganization[];
}

const OrganizationPage: React.FC<IOrganizationPageProps> = ({ organizations, myOrganizations }) => {
  const [addingNew, setAddingNew] = useState(false);
  const data: IOrganizationCardProps[] =
    myOrganizations &&
    myOrganizations.map(value => {
      return {
        name: value.name,
        id: +value.id,
        latitude: value.latitude,
        longitude: value.longitude
      };
    });

  return (
    <Box mt={4} display={'flex'} flexDirection={'column'} justifyContent={'center'} overflow={'scroll'}>
      <Box mb={2}>
        <Typography variant={'h5'} align={'center'}>
          {data.length > 0 ? 'Вы состоите в следующих организациях:' : 'Вы ещё не состоите ни в одной организации.'}
        </Typography>
      </Box>
      {data && data.map((value, index) => <OrganizationItem key={index} {...value} />)}
      {addingNew && <NewOrganizationCard myOrganizations={myOrganizations} organizations={organizations} />}
      {addingNew && (
        <Box mt={2} display={'flex'} justifyContent={'center'}>
          <Button variant={'text'} color={'primary'} onClick={() => setAddingNew(false)}>
            Отмена
          </Button>
        </Box>
      )}
      {!addingNew && (
        <Box mt={2} display={'flex'} justifyContent={'center'}>
          <Button variant={'text'} color={'primary'} onClick={() => setAddingNew(true)}>
            Присоединиться к новой организации
          </Button>
        </Box>
      )}
    </Box>
  );
};

const mapStateToProps = state => {
  return {
    organizations: state.org.organizations,
    myOrganizations: state.usr.organizations
  };
};

export default connect(mapStateToProps, null)(OrganizationPage);
