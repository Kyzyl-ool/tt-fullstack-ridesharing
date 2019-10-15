import React from 'react';
import { Box, Container, Input, InputBase, Typography } from '@material-ui/core';

interface ICreateTripPageProps {}

export const CreateTripPage: React.FC<ICreateTripPageProps> = props => {
  return (
    <Box flexDirection={'column'}>
      <Box flexDirection={'row'}>
        <Typography display={'inline'} variant={'h4'}>
          Время начала поездки:
        </Typography>
        <Input style={{width: '200px'}} type={'time'} />
      </Box>
    </Box>
  );
};
