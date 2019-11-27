/* eslint-disable no-inner-declarations */
import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Container,
  createStyles,
  makeStyles,
  MenuItem,
  Modal,
  Paper,
  TextField,
  Theme,
  Typography
} from '@material-ui/core';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import ruLocale from 'date-fns/locale/ru';
import { SearchResults } from '../../containers/SearchResults';
import TripModel from '../../models/tripModel';
import { snakeObjectToCamel } from '../../helpers/snakeToCamelCase';
import { SelectOrganizationInput } from '../../containers/SelectOrganizationInput';
import { setArrivalPointAction, setRideTimeAction, setStartOrganizationAction } from '../../store/actions/tripActions';
import { IOrganization } from '../../domain/organization';
import SelectAddressContainer from '../../containers/SelectAddressContainer';

const localMargin = 1;
const localPaperElevation = 4;

const useStyles = makeStyles((theme: Theme) => ({
  mapButton: {
    whiteSpace: 'nowrap',
    marginLeft: '8px',
    minWidth: 'fit-content'
  },
  searchButton: {
    margin: '10px'
  }
}));

const serializeTrip = (tripData: any) => {
  const { id, startTime, hostDriverInfo, stopAddress, totalSeats, passengers } = snakeObjectToCamel(tripData);
  return {
    id,
    date: startTime,
    name: hostDriverInfo && `${hostDriverInfo.firstName} ${hostDriverInfo.lastName}`,
    address: stopAddress,
    avatar: hostDriverInfo && hostDriverInfo.photoUrl,
    amountOfTakenPlaces: passengers.length,
    amountOfFreePlaces: totalSeats - passengers.length
  };
};

const fetchDataFromServer = async () => {
  const trips = await TripModel.getAllTrips();
  // console.log();
  return trips.map(trip => serializeTrip(trip));
};

interface ISearchTripPageProps {
  onSetStartOrganization: (startOrganization: { id: string; label: string }) => void;
  onSetArrivalPoint: (arrivalPoint: { name: string; latitude: number; longitude: number }) => void;
  onSetTime: (time: Date) => void;
  arrivalPoint: { name: string; latitude: number; longitude: number };
  startOrganization: { id: string; label: string };
  rideTime: string;
  availableOrganizations: IOrganization[];
}

const SearchTripPage: React.FC<ISearchTripPageProps> = ({
  onSetStartOrganization,
  onSetArrivalPoint,
  onSetTime,
  rideTime,
  arrivalPoint,
  startOrganization,
  availableOrganizations
}) => {
  const classes = useStyles({});
  const history = useHistory();
  const [searchButtonState, setSearchButtonState] = useState(false);
  // const [selectedDate, setSelectedDate] = useState(rideTime);
  const [progress, setProgress] = useState(true); // if search complete
  const [data, setData] = useState();
  const [addressFrom, handleAddressFrom] = useState('');
  const [addressTo, handleAddressTo] = useState('');
  const [isModalShown, setIsModalShown] = useState(false);

  useEffect(() => {
    if (progress) {
      (async function loadData() {
        const data = await fetchDataFromServer();
        setData(data);
      })();
      setProgress(false);
    }
  }, [progress]);

  const onSelectAddress = (arrivalPoint: { name: string; latitude: number; longitude: number }) => {
    setIsModalShown(false);
    onSetArrivalPoint(arrivalPoint);
  };

  const onStartSearching = async () => {
    const bestTrips = await TripModel.findBestTrips({
      startTime: rideTime,
      startOrganizationId: parseInt(startOrganization.id),
      destinationLatitude: arrivalPoint.latitude,
      destinationLongitude: arrivalPoint.longitude
    });
    //info[0] is trip object
    const serializedBestTrips = bestTrips.map(info => serializeTrip(info[0]));
    setData(serializedBestTrips);
  };

  useEffect(() => {
    setSearchButtonState(addressFrom.length > 0 && addressTo.length > 0);
  }, [addressFrom, addressTo]);
  return (
    <Box display={'flex'} alignContent={'space-between'} flexDirection={'column'}>
      <Modal open={isModalShown} onClose={() => setIsModalShown(false)}>
        <SelectAddressContainer onSetArrivalPoint={onSelectAddress} />
      </Modal>
      <Paper elevation={localPaperElevation}>
        <Container maxWidth={'sm'}>
          <Box m={localMargin} display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
            <Typography gutterBottom={true} display={'inline'} variant={'h6'}>
              &nbsp;Когда?
            </Typography>
            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ruLocale}>
              <DateTimePicker
                value={rideTime}
                onChange={onSetTime}
                inputVariant={'outlined'}
                variant={'dialog'}
                showTodayButton={true}
                cancelLabel={'Отмена'}
                todayLabel={'Сейчас'}
                okLabel={'Ок'}
                ampm={false}
                format="dd MMMM HH:mm"
              />
            </MuiPickersUtilsProvider>
          </Box>
          <SelectOrganizationInput
            onChange={onSetStartOrganization}
            currentOrganization={startOrganization}
            availableOrganizations={availableOrganizations}
          />
          <Box display={'flex'} alignItems={'center'} m={localMargin}>
            <TextField
              fullWidth
              placeholder={'Куда?'}
              variant={'outlined'}
              value={arrivalPoint.name}
              onChange={e => handleAddressTo(e.target.value)}
            />
            <Button className={classes.mapButton} onClick={() => setIsModalShown(true)}>
              На карте
            </Button>
          </Box>
          <Box display="flex" justifyContent="space-evenly" className={classes.searchButton}>
            <Button variant="text" onClick={() => history.push('/main')}>
              Назад
            </Button>
            <Button onClick={onStartSearching}>Найти</Button>
          </Box>
        </Container>
      </Paper>
      <SearchResults data={data} buttonState={searchButtonState} onClick={() => setProgress(true)} />
    </Box>
  );
};

const mapStateToProps = state => {
  return {
    arrivalPoint: state.trip.search.arrivalPoint,
    rideTime: state.trip.search.rideTime,
    availableOrganizations: state.org.organizations,
    startOrganization: state.trip.search.startOrganization
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSetStartOrganization: startOrganization => dispatch(setStartOrganizationAction(startOrganization, 'search')),
    onSetArrivalPoint: arrivalPoint => dispatch(setArrivalPointAction(arrivalPoint, 'search')),
    onSetTime: time => dispatch(setRideTimeAction(time, 'search'))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchTripPage);
