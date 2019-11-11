import React, { useEffect, useState } from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  createStyles,
  makeStyles,
  Theme,
  Typography
} from '@material-ui/core';
import { NavLink, useParams, useHistory } from 'react-router-dom';
import userModel from '../../models/userModel';
import { IOrganization } from '../../domain/organization';
import organizationsModel from '../../models/organizationsModel';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    media: {
      objectFit: 'contain'
    },
    actions: {
      placeContent: 'center'
    },
    disabledCard: {
      opacity: 0.5
    }
  })
);

export const OrganizationCard: React.FC = ({ ...props }) => {
  const classes = useStyles(props);
  const params = useParams() as any;
  const history = useHistory();
  const orgId = params.orgId;
  const [organizationPhotoSrc, setOrganizationPhotoSrc] = useState(undefined);
  const [amountOfPeople, setAmountOfPeople] = useState(undefined);
  const [amountOfDrivers, setAmountOfDrivers] = useState(undefined);
  const [address, setAddress] = useState(undefined);
  const [name, setName] = useState(undefined);
  const [disabled, setDisabled] = useState(false); // shows whether you left from organization or not
  const handleLeave = async () => {
    const response = await organizationsModel.leaveOrganization(orgId);
    if (response.organization_id === orgId) {
      setDisabled(true);
      history.goBack();
    }
  };

  useEffect(() => {
    const fetchOrgData = async () => {
      const response = await userModel.getUserData();
      const data = response.organizations.find(value => value.id === +orgId);
      setAddress(data.address);
      setAmountOfPeople(data.users.length);
      setAmountOfDrivers(0); // todo must be set correctly
      setName(data.name);
    };

    fetchOrgData();
  }, []);

  return (
    <Card className={disabled && classes.disabledCard}>
      <CardMedia
        component={'img'}
        image={
          (organizationPhotoSrc && organizationPhotoSrc) ||
          'https://cdn.steemitimages.com/DQmUcM45ZzL8A697W6v4LGph1RPerpDUnutJx73JXtz1nRc/neticon.jpg'
        }
        height={'200'}
        className={classes.media}
      />
      <CardContent>
        <Container>
          <Typography variant={'h5'}>
            <b>{name}</b>
          </Typography>
          <NavLink to={`/organizations/${orgId}/members`}>
            <Typography>
              Участников: {amountOfPeople}, них них водителей {amountOfDrivers}
            </Typography>
          </NavLink>
          <Typography>Адрес: {address}</Typography>
        </Container>
      </CardContent>
      <CardActions className={classes.actions}>
        <Button variant={'text'} color={'primary'} disabled={disabled} onClick={handleLeave}>
          {disabled ? 'Вы вышли из этой организации' : 'Выйти из организации'}
        </Button>
      </CardActions>
    </Card>
  );
};
