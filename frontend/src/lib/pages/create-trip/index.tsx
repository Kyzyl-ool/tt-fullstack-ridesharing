import React, { useState } from 'react';
import { Box, Button, Checkbox, Container, Switch, TextField, Typography, MenuItem, Modal } from '@material-ui/core';
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import ruLocale from 'date-fns/locale/ru';
import { makeStyles } from '@material-ui/core/styles';
import CrosshairButton from '../../components/CrosshairButton';
import { convertDate } from '../../helpers/convertDate';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { IOrganization } from '../../domain/organization';
import { ICar } from '../../domain/car';
import {
  setCostAction,
  setRideTimeAction,
  setStartOrganizationAction,
  setTotalSeatsAction,
  cleanCreateFormAction,
  setArrivalPointAction
} from '../../store/actions/tripActions';
import TripModel from '../../models/tripModel';
import { SelectOrganizationInput } from '../../containers/SelectOrganizationInput';
import SelectAddressContainer from '../../containers/SelectAddressContainer';

const localMargin = 1;

const seatsNumbers = [1, 2, 3, 4, 5, 6, 7];

const useStyles = makeStyles(theme => ({
  container: {
    paddingTop: '50px'
  },
  mapButton: {
    whiteSpace: 'nowrap',
    marginLeft: '8px',
    minWidth: 'fit-content'
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
  onSetArrivalPoint: (arrivalPoint: { name: string; latitude: number; longitude: number }) => void;
  cleanCreateForm: () => void;
  rideTime: string;
  cost: string;
  cars: ICar[];
  totalSeats: string;
  startOrganization: { id: string; label: string };
}

const CreateTripPage: React.FC<ICreateTripPageProps> = props => {
  const classes = useStyles({});
  const history = useHistory();
  const [isModalShown, setIsModalShown] = useState(false);
  const onCostInputChange = e => {
    props.onSetCost(e.target.value);
  };

  const onTotalSeatsChange = e => {
    props.onSetTotalSeats(e.target.value);
  };

  const onTimeInputChange = time => {
    props.onSetTime(convertDate(time.toString()));
  };

  const onCreateTripButtonClick = async () => {
    const { startOrganization, arrivalPoint, rideTime, totalSeats, cost, cars } = props;
    console.log(startOrganization);
    // TODO REMOVE WHEN CAR ADDING WILL BE READY
    const carId = cars[0] ? +cars[0].id : 0;
    const response = await TripModel.createTrip({
      startOrganizationId: +startOrganization.id,
      stopLatitude: arrivalPoint.latitude,
      stopLongitude: arrivalPoint.longitude,
      stopAddress: arrivalPoint.name,
      startTime: rideTime,
      // 0 because now we do not select car
      carId,
      cost: +cost,
      totalSeats: +totalSeats,
      description: ''
    });
    props.cleanCreateForm();
    if (response) history.push('/search_trip');
  };

  const onSelectAddress = (arrivalPoint: { name: string; latitude: number; longitude: number }) => {
    setIsModalShown(false);
    props.onSetArrivalPoint(arrivalPoint);
  };

  return (
    <Container className={classes.container} maxWidth="sm">
      <Box display="flex" justifyContent="space-evenly" alignItems="center">
        <Typography display="inline" variant="h6">
          Время начала:
        </Typography>
        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ruLocale}>
          <DateTimePicker
            disablePast
            value={props.rideTime}
            label="Время поездки"
            onChange={onTimeInputChange}
            inputVariant="outlined"
            variant="dialog"
            showTodayButton={true}
            cancelLabel="Отмена"
            todayLabel="Сейчас"
            okLabel="Ок"
            ampm={false}
            format="dd MMMM HH:mm"
          />
        </MuiPickersUtilsProvider>
      </Box>
      <SelectOrganizationInput
        onChange={props.onSetStartOrganization}
        currentOrganization={props.startOrganization}
        availableOrganizations={props.availableOrganizations}
      />
      <Box display="flex" alignItems="center" m={localMargin}>
        <TextField
          fullWidth
          value={props.arrivalPoint.name || ''}
          onChange={() => {}}
          label="Место назначения"
          variant="outlined"
        />
        <Button className={classes.mapButton} onClick={() => setIsModalShown(true)}>
          На карте
        </Button>
      </Box>
      <Modal open={isModalShown} onClose={() => setIsModalShown(false)}>
        <SelectAddressContainer onSetArrivalPoint={onSelectAddress} />
      </Modal>
      <Box m={localMargin}>
        <TextField
          fullWidth
          value={props.totalSeats}
          label="Количество мест"
          select
          onChange={onTotalSeatsChange}
          variant="outlined"
        >
          {seatsNumbers.map((num, index) => (
            <MenuItem key={index} value={num}>
              {num}
            </MenuItem>
          ))}
        </TextField>
      </Box>
      <Box m={localMargin} textAlign="justify">
        <TextField
          value={props.cost}
          onChange={onCostInputChange}
          fullWidth
          variant="outlined"
          label="Стоимость поездки"
        />
        <Checkbox />
        <Typography display="inline" variant="caption">
          На усмотрение пассажира
        </Typography>
      </Box>
      <Box display="flex" justifyContent="center" m={localMargin}></Box>
      <Box m={localMargin} display="flex" justifyContent="space-evenly">
        <Button onClick={() => history.goBack()} variant="text">
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
    totalSeats: state.trip.create.totalSeats,
    rideTime: state.trip.create.rideTime,
    cost: state.trip.create.cost,
    cars: state.car.cars,
    arrivalPoint: state.trip.create.arrivalPoint,
    startOrganization: state.trip.create.startOrganization
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSetCost: cost => dispatch(setCostAction(+cost, 'create')),
    onSetTotalSeats: totalSeats => dispatch(setTotalSeatsAction(+totalSeats, 'create')),
    onSetTime: time => dispatch(setRideTimeAction(time, 'create')),
    onSetStartOrganization: startOrganization => dispatch(setStartOrganizationAction(startOrganization, 'create')),
    onSetArrivalPoint: arrivalPoint => dispatch(setArrivalPointAction(arrivalPoint, 'create')),
    cleanCreateForm: () => dispatch(cleanCreateFormAction())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateTripPage);
