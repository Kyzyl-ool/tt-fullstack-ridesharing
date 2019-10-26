import React, { useState } from 'react';
import { Box, Button, Checkbox, Container, Switch, TextField, Typography } from '@material-ui/core';
import CrosshairButton from '../../components/CrosshairButton';
import DropdownInput from '../../components/DropdownInput';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const localMargin = 1;

const CreateTripPage: React.FC = props => {
  const [time, setTime] = useState('');
  const [startOrganization, setStartOrganization] = useState('');
  const [selectedStartOrganization, setSelectedStartOrganization] = useState({});
  const [destinationOrganization, setDestinationOrganization] = useState('');
  const [cost, setCost] = useState('');

  const onSelectOrganization = ({ id, value }: { id: string; value: string }) => {
    setSelectedStartOrganization({ id, value });
  };
  return (
    <Container maxWidth={'sm'}>
      <Box display={'flex'} justifyContent={'space-evenly'} alignItems={'center'}>
        <Typography noWrap display={'inline'} variant={'h6'}>
          Время начала:
        </Typography>
        <TextField value={time} onChange={e => setTime(e.target.value)} variant={'outlined'} type={'time'} />
      </Box>
      <Box display={'flex'} alignItems={'center'} m={localMargin}>
        <DropdownInput
          fullWidth
          value={startOrganization}
          margin={0}
          onSelect={onSelectOrganization}
          onChange={e => setStartOrganization(e.target.value)}
          placeholder={'Откуда?'}
          variant={'outlined'}
        />
      </Box>
      <Box display={'flex'} alignItems={'center'} m={localMargin}>
        <TextField
          fullWidth
          value={destinationOrganization}
          onChange={e => setDestinationOrganization(e.target.value)}
          placeholder={'Куда?'}
          variant={'outlined'}
        />
        <Link to="select_address">
          <CrosshairButton onClick={() => {}} />
        </Link>
      </Box>
      <Box m={localMargin}>
        <TextField fullWidth placeholder={'Кол-во мест'} variant={'outlined'} />
      </Box>
      <Box m={localMargin} textAlign={'justify'}>
        <TextField
          value={cost}
          onChange={e => setCost(e.target.value)}
          fullWidth
          placeholder={'Стоимость поездки'}
          variant={'outlined'}
        />
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
        <Button onClick={() => {}}>Создать поездку</Button>
      </Box>
    </Container>
  );
};

// const mapStateToProps = state => {
//   return {
//     arrivalPoint: state.
//   }
// }

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  null,
  mapDispatchToProps
)(CreateTripPage);
