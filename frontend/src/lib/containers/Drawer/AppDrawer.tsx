import React, { useEffect } from 'react';
import { Box, Button, createStyles, Divider, Drawer, makeStyles, Theme, Typography } from '@material-ui/core';
import { MyAvatar } from '../../components/Avatar/Avatar';
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
      padding: theme.spacing(1)
    },
    buttons: {
      display: 'flex',
      flexDirection: 'column',
      padding: theme.spacing(1),
      justifyContent: 'space-between'
      // marginTop: theme.spacing(1)
    },
    button: {
      marginTop: theme.spacing(1)
    },
    noTextDecoration: {
      textDecoration: 'none'
    }
  })
);

interface IAppDrawerProps {
  firstName: string;
  lastName: string;
  email: string;
  trips: IResponseTrip[];
  open: boolean;
  onClose: () => any;
}

const AppDrawer: React.FC<IAppDrawerProps> = ({ firstName, lastName, email, trips, ...props }) => {
  const classes = useStyles(props);

  useEffect(() => {
    const fetchData = async () => {
      console.log(trips);

      /*
      cost: null
      description: ""
      estimated_time: null
      host_driver_id: 1
      id: 4
      is_available: true
      is_finished: false
      passengers: [1]
      start_organization: 2
      start_organization_id: 2
      start_time: "2019-10-30T22:20:00.001000"
      stop_address: null
      stop_latitude: 55.72893
      stop_longitude: 37.618255
      total_seats: 3
       */
    };

    fetchData();
  }, []);

  return (
    <Drawer open={props.open} onClose={props.onClose}>
      <Box className={classes.root}>
        <MyAvatar src="https://material-ui.com/static/images/avatar/1.jpg" />
        <Box>
          <Typography variant={'h5'}>{`${firstName} ${lastName}`}</Typography>
          <Typography variant={'body1'}>{email}</Typography>
        </Box>
        <Divider />
        <Box className={classes.buttons}>
          <NavLink to={'/main'} className={classes.noTextDecoration} onClick={props.onClose}>
            <Button className={classes.button}>На главную</Button>
          </NavLink>
          <NavLink to={'/organizations'} className={classes.noTextDecoration} onClick={props.onClose}>
            <Button className={classes.button}>Мои организации</Button>
          </NavLink>
        </Box>
        <Divider />
        <Typography variant={'body1'} align={'center'}>{`Вы участвуете в ${trips.length} поездках:`}</Typography>
        <MyTrips
          data={trips.map(value => ({ id: +value.id, date: new Date(value.startTime), name: `${value.hostDriverId}` }))}
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
