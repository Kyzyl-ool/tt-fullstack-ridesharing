import React, { useState } from 'react';
import _debounce from 'lodash/debounce';
import { Box, Button, Checkbox, Container, Switch, TextField, Typography, MenuItem } from '@material-ui/core';
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import ruLocale from 'date-fns/locale/ru';
import { makeStyles } from '@material-ui/core/styles';
import CrosshairButton from '../../components/CrosshairButton';
import { convertDate } from '../../helpers/convertDate';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { IOrganization } from '../../domain/organization';
import {
  setCostAction,
  setRideTimeAction,
  setStartOrganizationAction,
  setTotalSeatsAction,
  cleanCreateFormAction
} from '../../store/actions/tripActions';
import TripModel from '../../models/tripModel';

const localMargin = 1;

const seatsNumbers = [1, 2, 3, 4, 5, 6, 7];

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
  arrivalPoint: { name: string; latitude: number; longitude: number };
  onSetCost: (cost: string) => void;
  onSetTotalSeats: (totalSeats: string) => void;
  onSetTime: (time: string) => void;
  onSetStartOrganization: (startOrganization: { id: string; label: string }) => void;
  cleanCreateForm: () => void;
  rideTime: string;
  cost: string;
  totalSeats: string;
  startOrganization: { id: string; label: string };
}

const CreateTripPage: React.FC<ICreateTripPageProps> = props => {
  const classes = useStyles({});
  const history = useHistory();
  const onCostInputChange = e => {
    props.onSetCost(e.target.value);
  };

  const onTotalSeatsChange = e => {
    props.onSetTotalSeats(e.target.value);
  };

  const onStartOrganizationChange = e => {
    const orgName = e.target.value;
    props.onSetStartOrganization({
      label: orgName,
      id: props.availableOrganizations.find(org => org.name === orgName).id
    });
  };

  const onTimeInputChange = time => {
    props.onSetTime(convertDate(time.toString()));
  };

  const onCreateTripButtonClick = async () => {
    const { startOrganization, arrivalPoint, rideTime, totalSeats, cost } = props;
    await TripModel.createTrip({
      startOrganizationId: +startOrganization.id,
      stopLatitude: arrivalPoint.latitude,
      stopLongitude: arrivalPoint.longitude,
      startTime: rideTime,
      totalSeats: +totalSeats,
      description: ''
    });
    props.cleanCreateForm();
  };

  return (
    <Container maxWidth={'sm'}>
      <Box display={'flex'} justifyContent={'space-evenly'} alignItems={'center'}>
        <Typography noWrap display={'inline'} variant={'h6'}>
          Время начала:
        </Typography>
        {/* <TextField value={props.rideTime} onChange={onTimeInputChange} variant={'outlined'} type={'time'} /> */}
        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ruLocale}>
          <DateTimePicker
            value={props.rideTime || new Date()}
            onChange={onTimeInputChange}
            inputVariant={'outlined'}
            variant={'dialog'}
            showTodayButton={true}
            cancelLabel={'Отмена'}
            todayLabel={'Сейчас'}
            okLabel={'Ок'}
          />
        </MuiPickersUtilsProvider>
      </Box>
      <Box display={'flex'} alignItems={'center'} m={localMargin}>
        <TextField
          fullWidth
          value={props.startOrganization.label || 'none'}
          className={classes.textField}
          onChange={onStartOrganizationChange}
          select
          SelectProps={{
            // defaultValue: 'none',
            MenuProps: {
              className: classes.menu
            }
          }}
          variant="outlined"
        >
          <MenuItem value="none" disabled>
            Откуда?
          </MenuItem>
          {props.availableOrganizations.map((org, index) => (
            <MenuItem key={index} value={org.name}>
              {org.name}
            </MenuItem>
          ))}
        </TextField>
      </Box>
      <Box display={'flex'} alignItems={'center'} m={localMargin}>
        <TextField
          fullWidth
          value={props.arrivalPoint.name}
          onChange={() => {}}
          placeholder={'Куда?'}
          variant={'outlined'}
        />
        <Link to="select_address">
          <CrosshairButton onClick={() => {}} />
        </Link>
      </Box>
      <Box m={localMargin}>
        <TextField fullWidth value={props.totalSeats || 'none'} select onChange={onTotalSeatsChange} variant="outlined">
          <MenuItem value="none" disabled>
            Кол-во мест
          </MenuItem>
          {seatsNumbers.map((num, index) => (
            <MenuItem key={index} value={num}>
              {num}
            </MenuItem>
          ))}
        </TextField>
      </Box>
      <Box m={localMargin} textAlign={'justify'}>
        <TextField
          value={props.cost}
          onChange={onCostInputChange}
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
        <Button onClick={() => history.goBack()} variant={'text'}>
          Назад
        </Button>
        <Button onClick={onCreateTripButtonClick}>Создать поездку</Button>
      </Box>
    </Container>
  );
};

const mapStateToProps = state => {
  return {
    availableOrganizations: state.org.organizations,
    totalSeats: state.trip.totalSeats,
    rideTime: state.trip.rideTime,
    cost: state.trip.cost,
    arrivalPoint: state.trip.arrivalPoint,
    startOrganization: state.trip.startOrganization
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSetCost: cost => dispatch(setCostAction(+cost)),
    onSetTotalSeats: totalSeats => dispatch(setTotalSeatsAction(+totalSeats)),
    onSetTime: time => dispatch(setRideTimeAction(time)),
    onSetStartOrganization: startOrganization => dispatch(setStartOrganizationAction(startOrganization)),
    cleanCreateForm: () => dispatch(cleanCreateFormAction())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateTripPage);
