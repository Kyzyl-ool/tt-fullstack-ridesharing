import React, { useState, useEffect } from 'react';
import { Box, Card, createStyles, makeStyles, Theme, Typography } from '@material-ui/core';
import dateFormat from 'date-fns/format';
import ruLocale from 'date-fns/locale/ru';
import { Avatar } from '../../components/Avatar/Avatar';
import { NavLink } from 'react-router-dom';
import { snakeObjectToCamel } from '../../helpers/snakeToCamelCase';
import TripModel from '../../models/tripModel';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    trip: {
      display: 'flex',
      border: '1px solid #f0f0f0',
      padding: '10px',
      flexDirection: 'row',
      marginTop: theme.spacing(1)
    },
    noTextDecoration: {
      textDecoration: 'none'
    },
    infoContainer: {
      marginLeft: '10px'
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
  data: ITripProps[];
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
  return (
    <Box display={'flex'} flexDirection={'column'}>
      {props.data.map((value, index) => (
        <NavLink onClick={props.onClick} key={index} to={`/trip/${value.id}`} className={classes.noTextDecoration}>
          <Card className={classes.trip} elevation={2}>
            <Avatar src={value.avatar} />
            <Box className={classes.infoContainer} alignSelf={'center'}>
              <Typography>
                {' '}
                <b> {value.name} </b>
              </Typography>
              <Typography>{`${dateFormat(value.date, `d MMMM HH':'mm`, { locale: ruLocale })}`}</Typography>
            </Box>
          </Card>
        </NavLink>
      ))}
    </Box>
  );
};
