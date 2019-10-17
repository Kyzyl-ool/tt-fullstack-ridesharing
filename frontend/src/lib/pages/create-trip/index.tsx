import React from 'react';
import { Box, Button, Checkbox, Container, Switch, TextField, Typography } from '@material-ui/core';

const localMargin = 1;

export const CreateTripPage: React.FC = props => {
  return (
    <Container maxWidth={'sm'}>
      <Box display={'flex'} justifyContent={'space-evenly'} alignItems={'center'}>
        <Typography noWrap display={'inline'} variant={'h6'}>
          Время начала поездки:
        </Typography>
        <TextField style={{ width: '80px' }} variant={'outlined'} type={'time'} />
      </Box>
      <Box m={localMargin}>
        <TextField fullWidth placeholder={'Откуда?'} variant={'outlined'} />
      </Box>
      <Box m={localMargin}>
        <TextField fullWidth placeholder={'Куда?'} variant={'outlined'} />
      </Box>
      <Box m={localMargin}>
        <TextField fullWidth placeholder={'Кол-во мест'} variant={'outlined'} />
      </Box>
      <Box m={localMargin} textAlign={'justify'}>
        <TextField fullWidth placeholder={'Стоимость поездки'} variant={'outlined'} />
        <Checkbox />
        <Typography display={'inline'} variant={'caption'}>
          На усмотрение пассажира
        </Typography>
      </Box>
      <Box m={localMargin}>
        <Typography display={'inline'} variant={'caption'}>
          Запланировать поездку на несколько дней
        </Typography>
        <Switch />
      </Box>
      <Box m={localMargin} display={'flex'} justifyContent={'space-evenly'}>
        <Button variant={'text'}>Назад</Button>
        <Button>Создать поездку</Button>
      </Box>
    </Container>
  );
};
