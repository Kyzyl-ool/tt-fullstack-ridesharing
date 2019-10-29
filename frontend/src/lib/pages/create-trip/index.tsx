import React, { useState } from 'react';
import { Box, Button, Checkbox, Container, Switch, TextField, Typography, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CrosshairButton from '../../components/CrosshairButton';
import DropdownInput from '../../components/DropdownInput';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { IOrganization } from '../../domain/organization';

const localMargin = 1;

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    // marginLeft: theme.spacing(1),
    // marginRight: theme.spacing(1)
  },
  menu: {
    width: 200
  }
}));

interface ICreateTripPageProps {
  availableOrganizations: IOrganization[];
}

const CreateTripPage: React.FC<ICreateTripPageProps> = ({ availableOrganizations }) => {
  const classes = useStyles({});
  const [time, setTime] = useState('');
  const [startOrganization, setStartOrganization] = useState('Откуда?');
  const [selectedStartOrganization, setSelectedStartOrganization] = useState({});
  const [destinationOrganization, setDestinationOrganization] = useState('');
  const [cost, setCost] = useState('');

  // const onSelectOrganization = ({ id, value }: { id: string; value: string }) => {
  //   setSelectedStartOrganization({ id, value });
  // };
  console.log(startOrganization);
  return (
    <Container maxWidth={'sm'}>
      <Box display={'flex'} justifyContent={'space-evenly'} alignItems={'center'}>
        <Typography noWrap display={'inline'} variant={'h6'}>
          Время начала:
        </Typography>
        <TextField value={time} onChange={e => setTime(e.target.value)} variant={'outlined'} type={'time'} />
      </Box>
      <Box display={'flex'} alignItems={'center'} m={localMargin}>
        <TextField
          fullWidth
          value={startOrganization || 'Откуда?'}
          className={classes.textField}
          onChange={e => setStartOrganization(e.target.value)}
          select
          SelectProps={{
            defaultValue: 'none',
            MenuProps: {
              className: classes.menu
            }
          }}
          variant="outlined"
        >
          <MenuItem value="none" disabled>
            Откуда?
          </MenuItem>
          {availableOrganizations.map((org, index) => (
            <MenuItem key={index} value={org.name}>
              {org.name}
            </MenuItem>
          ))}
        </TextField>
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
      <Box display="flex" justifyContent="center" m={localMargin}>
        <Typography variant={'caption'}>Запланировать поездку на несколько дней</Typography>
        <Switch />
      </Box>
      <Box m={localMargin} display={'flex'} justifyContent={'space-evenly'}>
        <Button variant={'text'}>Назад</Button>
        <Button onClick={() => {}}>Создать поездку</Button>
      </Box>
    </Container>
  );
};

const mapStateToProps = state => {
  return {
    availableOrganizations: state.org.organizations
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateTripPage);
