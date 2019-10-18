import React from 'react';
import { Box, Card, createStyles, makeStyles, Theme, Typography } from '@material-ui/core';
import dateFormat from 'date-fns/format';
import ruLocale from 'date-fns/locale/ru';
import { MyAvatar } from '../../components/Avatar/Avatar';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    trip: {
      display: 'flex',
      // border: '1px solid black',
      flexDirection: 'row',
      marginTop: theme.spacing(1)
    }
  })
);

interface ITrip {
  name: string;
  date: Date;
  avatar: string;
}
interface IMyTripsProps {
  data: ITrip[];
}

export const MyTrips: React.FC<IMyTripsProps> = props => {
  const classes = useStyles(props);
  return (
    <Box display={'flex'} flexDirection={'column'}>
      {props.data.map((value, index) => (
        <Card key={index} className={classes.trip} elevation={2}>
          <MyAvatar src={value.avatar} />
          <Box alignSelf={'center'}>
            <Typography>
              {' '}
              <b> {value.name} </b>
            </Typography>
            <Typography>{`${dateFormat(value.date, `d MMMM HH':'mm`, { locale: ruLocale })}`}</Typography>
          </Box>
        </Card>
      ))}
    </Box>
  );
};
