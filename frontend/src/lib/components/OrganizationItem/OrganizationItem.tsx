import React, { useEffect, useState } from 'react';
import { Box, createStyles, makeStyles, Paper, Theme, Typography } from '@material-ui/core';
import { Avatar } from '../Avatar/Avatar';
import { NavLink } from 'react-router-dom';
import MapModel from '../../models/mapModel';
import _get from 'lodash/get';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      // margin: theme.spacing(1),
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center'
    },
    text: {},
    noTextDecoration: {
      textDecoration: 'none'
    }
  })
);

export interface IOrganizationCardProps {
  name: string;
  latitude: number;
  longitude: number;
  avatarSrc?: string;
  id: number;
}

export const OrganizationItem: React.FC<IOrganizationCardProps> = ({
  name,
  latitude,
  longitude,
  avatarSrc,
  id,
  ...props
}) => {
  const classes = useStyles(props);
  const [address, setAddress] = useState('...');

  useEffect(() => {
    const getAddress = async () => {
      const data = await MapModel.reverseGeocoding({ longitude, latitude });
      const address = _get(data, 'response.GeoObjectCollection.featureMember[0].GeoObject.name');
      setAddress(address ? address : 'Не удалось выяснить адрес');
    };

    getAddress();
  }, []);

  return (
    <NavLink to={`/organizations/${id}`} className={classes.noTextDecoration}>
      <Paper elevation={2}>
        <Box display={'flex'} alignItems={'center'} p={2}>
          <Box m={1}>
            <Avatar
              src={
                (avatarSrc && avatarSrc) ||
                'https://cdn.steemitimages.com/DQmUcM45ZzL8A697W6v4LGph1RPerpDUnutJx73JXtz1nRc/neticon.jpg'
              }
            />
          </Box>
          <Box className={classes.text}>
            <Typography variant={'h5'}>
              <b>{name}</b>
            </Typography>
            <Typography variant={'body1'}>{address}</Typography>
          </Box>
        </Box>
      </Paper>
    </NavLink>
  );
};
