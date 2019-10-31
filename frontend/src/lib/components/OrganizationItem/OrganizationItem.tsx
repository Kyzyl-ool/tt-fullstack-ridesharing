import React from 'react';
import { Box, Card, CardContent, createStyles, makeStyles, Theme, Typography } from '@material-ui/core';
import { MyAvatar } from '../Avatar/Avatar';
import { NavLink } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      margin: theme.spacing(1),
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
  address: string;
  avatarSrc?: string;
  id: number;
}

export const OrganizationItem: React.FC<IOrganizationCardProps> = ({ name, address, avatarSrc, id, ...props }) => {
  const classes = useStyles(props);

  return (
    <Card>
      <NavLink to={`/organizations/${id}`} className={classes.noTextDecoration}>
        <CardContent className={classes.card}>
          <Box>
            <MyAvatar
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
        </CardContent>
      </NavLink>
    </Card>
  );
};
