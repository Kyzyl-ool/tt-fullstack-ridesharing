import React, { useEffect } from 'react';
import { Box, Button, createStyles, Divider, Drawer, makeStyles, Theme, Typography } from '@material-ui/core';
import { Avatar } from '../../components/Avatar/Avatar';
import { MyTrips } from '../MyTrips/MyTrips';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { IResponseTrip } from '../../store/reducers/allTripsReducer';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    avatar: {
      borderRadius: '50%',
      width: '60px',
      height: '60px'
    },
    root: {
      padding: theme.spacing(1),
      width: '260px'
    },
    buttons: {
      display: 'flex',
      flexDirection: 'column',
      padding: theme.spacing(1)
      // marginTop: theme.spacing(1)
    },
    button: {
      width: '80%',
      marginTop: theme.spacing(1)
    },
    noTextDecoration: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textDecoration: 'none'
    }
  })
);

interface IAppDrawerProps {
  firstName: string;
  lastName: string;
  email: string;
  photoUrl: string;
  trips: IResponseTrip[];
  open: boolean;
  onClose: () => any;
}
const AppDrawer: React.FC<IAppDrawerProps> = ({ firstName, lastName, email, photoUrl, trips, ...props }) => {
  const classes = useStyles(props);
  return (
    <Drawer open={props.open} onClose={props.onClose}>
      <Box className={classes.root}>
        <Avatar src={photoUrl} />
        <Box>
          <Typography variant={'h5'}>{`${firstName} ${lastName}`}</Typography>
          <Typography variant={'body1'}>{email}</Typography>
        </Box>
        <Divider />
        <Box className={classes.buttons}>
          <NavLink to={'/main'} className={classes.noTextDecoration} onClick={props.onClose}>
            <Button className={classes.button}>На главную</Button>
          </NavLink>
          <NavLink to={'/profile'} className={classes.noTextDecoration} onClick={props.onClose}>
            <Button className={classes.button}>Мой профиль</Button>
          </NavLink>
          <NavLink to={'/organizations'} className={classes.noTextDecoration} onClick={props.onClose}>
            <Button className={classes.button}>Мои организации</Button>
          </NavLink>
        </Box>
        <Divider />
        <Typography variant={'body1'} align={'center'}>{`Вы участвуете в ${
          Object.entries(trips).length
        } поездках:`}</Typography>
        <MyTrips
          data={Object.entries(trips)
            .map(value => value[1])
            .map(value => ({
              id: +value.id,
              date: new Date(value.startTime),
              name: `${value.hostDriverInfo.firstName} ${value.hostDriverInfo.lastName}`
            }))}
          onClick={props.onClose}
        />
      </Box>
    </Drawer>
  );
};

const mapStateToProps = state => {
  return {
    ...state.usr,
    ...state.org,
    ...state.trips
  };
};

export default connect(mapStateToProps)(AppDrawer);
