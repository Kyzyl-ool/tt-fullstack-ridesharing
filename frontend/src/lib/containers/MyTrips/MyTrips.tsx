import React, { useState, useEffect } from 'react';
import { Box, Card, createStyles, makeStyles, Theme, Typography } from '@material-ui/core';
import _isEmpty from 'lodash/isEmpty';
import dateFormat from 'date-fns/format';
import ruLocale from 'date-fns/locale/ru';
import { Avatar } from '../../components/Avatar/Avatar';
import { NavLink } from 'react-router-dom';
import { snakeObjectToCamel } from '../../helpers/snakeToCamelCase';
import TripModel from '../../models/tripModel';
import DriverIcon from './driver-import-icon.svg';
import ArchiveIcon from './archive-import-icon.svg';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    trip: {
      display: 'flex',
      border: '1px solid #f0f0f0',
      padding: '10px',
      flexDirection: 'row',
      marginTop: theme.spacing(1),
      position: 'relative'
    },
    noTextDecoration: {
      textDecoration: 'none'
    },
    infoContainer: {
      marginLeft: '10px'
    },
    archivedTrip: {
      display: 'flex',
      border: '1px solid #f0f0f0',
      padding: '10px',
      flexDirection: 'row',
      marginTop: theme.spacing(1),
      position: 'relative',
      opacity: 0.5
    }
  })
);

export interface ITripProps {
  name: string;
  date: Date;
  avatar?: string;
  id: number;
}
interface IMyTripsProps {
  data?: ITripProps[];
  variant: 'driver' | 'passenger' | 'archived';
  onClick: (any) => any;
}

export const MyTrips: React.FC<IMyTripsProps> = props => {
  const classes = useStyles(props);
  const [trips, setTrips] = useState([]);
  const getDriverName = async trip => {
    // TODO MAKE GETTING INFO WITH ANOTHER ENDPOINT
    // WHEN IT WILL EXIST
    const hostDriverId = trip.hostDriverId;
    const driverInfo = await TripModel.getPassengersInfo([hostDriverId]);
    const camelDriverInfo = snakeObjectToCamel(driverInfo[0]);
    return `${camelDriverInfo.firstName} ${camelDriverInfo.lastName}`;
  };
  const renderTrips = (value, index, flag) => (
    <NavLink onClick={props.onClick} key={index} to={`/trip/${value.id}`} className={classes.noTextDecoration}>
      <Card className={flag === 'archived' ? classes.archivedTrip : classes.trip} elevation={2}>
        <Avatar noResize src={value.avatar} />
        <Box className={classes.infoContainer} alignSelf={'center'}>
          <Typography>
            {' '}
            <b> {value.name} </b>
          </Typography>
          <Typography>{`${dateFormat(value.date, `d MMMM HH':'mm`, { locale: ruLocale })}`}</Typography>
        </Box>
        {flag === 'driver' && (
          <DriverIcon
            width={24}
            height={24}
            style={{ position: 'absolute', top: '10px', right: '10px', fill: `grey` }}
          />
        )}
        {flag === 'archived' && (
          <ArchiveIcon
            width={24}
            height={24}
            style={{ position: 'absolute', top: '10px', right: '10px', fill: `grey` }}
          />
        )}
      </Card>
    </NavLink>
  );
  return (
    <Box display={'flex'} flexDirection={'column'}>
      {props.data &&
        !_isEmpty(props.data) &&
        props.data.map((value, index) => renderTrips(value, index, props.variant))}
      {/* {props.passengerData.map((value, index) => renderTrips(value, index, 'passenger'))}
      {props.archivedData &&
        !_isEmpty(props.archivedData) &&
        props.archivedData.map((value, index) => renderTrips(value, index, 'archived'))} */}
    </Box>
  );
};
