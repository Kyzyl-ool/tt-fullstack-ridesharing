import React from 'react';
import { Box, Button, Checkbox, Container, Switch, TextField, Typography } from '@material-ui/core';
import CrosshairButton from '../../components/CrosshairButton';
import { Link } from 'react-router-dom';

const localMargin = 1;

export const CreateTripPage: React.FC = props => {
  return (
    <Container maxWidth={'sm'}>
      <Box display={'flex'} justifyContent={'space-evenly'} alignItems={'center'}>
        <Typography noWrap display={'inline'} variant={'h6'}>
          Время начала:
        </Typography>
        <TextField variant={'outlined'} type={'time'} />
      </Box>
      <Box display={'flex'} alignItems={'center'} m={localMargin}>
        <TextField fullWidth placeholder={'Откуда?'} variant={'outlined'} />
        <Link to="select_address">
          <CrosshairButton onClick={() => console.log('e')} />
        </Link>
      </Box>
      <Box display={'flex'} alignItems={'center'} m={localMargin}>
        <TextField fullWidth placeholder={'Куда?'} variant={'outlined'} />
        <Link to="select_address">
          <CrosshairButton onClick={() => console.log('e')} />
        </Link>
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