import React from 'react';
import { Box, Typography } from '@material-ui/core';
import dateFormat from 'date-fns/format';
import ruLocale from 'date-fns/locale/ru';
import { MyAvatar } from '../../components/Avatar/Avatar';

interface ITrip {
  name: string;
  date: Date;
  avatar: string;
}
interface IMyTripsProps {
  data: ITrip[];
}

export const MyTrips: React.FC<IMyTripsProps> = props => {
  return (
    <Box display={'flex'} flexDirection={'column'}>
      {props.data.map((value, index) => (
        <Box key={index} display={'flex'} flexDirection={'row'}>
          <MyAvatar src={value.avatar} />
          <Box alignSelf={'center'}>
            <Typography>{value.name}</Typography>
            <Typography>{`${dateFormat(value.date, `d MMMM HH':'mm`, { locale: ruLocale })}`}</Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
};
