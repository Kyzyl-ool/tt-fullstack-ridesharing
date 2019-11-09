/* eslint-disable no-inner-declarations */
import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Container,
  createStyles,
  makeStyles,
  MenuItem,
  Paper,
  TextField,
  Theme,
  Typography
} from '@material-ui/core';
import { connect } from 'react-redux';
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import ruLocale from 'date-fns/locale/ru';
import { SearchResults } from '../../containers/SearchResults';
import TripModel from '../../models/tripModel';

import { snakeObjectToCamel } from '../../helpers/snakeToCamelCase';
import { SelectOrganizationInput } from '../../containers/SelectOrganizationInput';
import { setStartOrganizationAction } from '../../store/actions/tripActions';
import { IOrganization } from '../../domain/organization';

const localMargin = 1;
const localPaperElevation = 4;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(3, 2)
    }
  })
);

const serializeTrip = (tripData: any) => {
  const { id, startTime, hostDriverInfo, stopAddress, totalSeats } = snakeObjectToCamel(tripData);

  return {
    id,
    date: startTime,
    name: hostDriverInfo && `${hostDriverInfo.first_name} ${hostDriverInfo.last_name}`,
    address: stopAddress,
    avatar: null,
    amountOfFreePlaces: totalSeats
  };
};

const fetchDataFromServer = async () => {
  const trips = await TripModel.getAllTrips();
  // console.log();
  return trips.map(trip => serializeTrip(trip));
};

interface ISearchTripPageProps {
  onSetStartOrganization: (startOrganization: { id: string; label: string }) => void;
  startOrganization: { id: string; label: string };
  availableOrganizations: IOrganization[];
}

const SearchTripPage: React.FC<ISearchTripPageProps> = ({
  onSetStartOrganization,
  startOrganization,
  availableOrganizations
}) => {
  const classes = useStyles({});
  const [searchButtonState, setSearchButtonState] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [progress, setProgress] = useState(false); // if search complete
  const [data, setData] = useState();
  const [addressFrom, handleAddressFrom] = useState('');
  const [addressTo, handleAddressTo] = useState('');

  useEffect(() => {
    if (progress) {
      (async function loadData() {
        const data = await fetchDataFromServer();
        setData(data);
      })();
      setProgress(false);
    }
  }, [progress]);

  useEffect(() => {
    setSearchButtonState(addressFrom.length > 0 && addressTo.length > 0);
  }, [addressFrom, addressTo]);
  return (
    <Box display={'flex'} alignContent={'space-between'} flexDirection={'column'}>
      <Paper elevation={localPaperElevation} className={classes.root}>
        <Container maxWidth={'sm'}>
          <Box m={localMargin} display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
            <Typography gutterBottom={true} display={'inline'} variant={'h6'}>
              &nbsp;Когда?
            </Typography>
            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ruLocale}>
              <DateTimePicker
                value={selectedDate}
                onChange={setSelectedDate}
                inputVariant={'outlined'}
                variant={'dialog'}
                showTodayButton={true}
                cancelLabel={'Отмена'}
                todayLabel={'Сейчас'}
                okLabel={'Ок'}
              />
            </MuiPickersUtilsProvider>
          </Box>
          <SelectOrganizationInput
            onChange={onSetStartOrganization}
            currentOrganization={startOrganization}
            availableOrganizations={availableOrganizations}
          />
          <Box m={localMargin}>
            <TextField
              fullWidth
              placeholder={'Куда?'}
              variant={'outlined'}
              value={addressTo}
              onChange={e => handleAddressTo(e.target.value)}
            />
          </Box>
        </Container>
      </Paper>
      <SearchResults data={data} buttonState={searchButtonState} onClick={() => setProgress(true)} />
    </Box>
  );
};

const mapStateToProps = state => {
  return {
    availableOrganizations: state.org.organizations,
    startOrganization: state.trip.search.startOrganization
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSetStartOrganization: startOrganization => dispatch(setStartOrganizationAction(startOrganization, 'search'))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchTripPage);
