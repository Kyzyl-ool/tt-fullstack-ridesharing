import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Container,
  createStyles,
  makeStyles,
  Paper,
  TextField,
  Theme,
  Typography
} from '@material-ui/core';
import { SearchResults } from '../../containers/SearchResults';
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import ruLocale from 'date-fns/locale/ru';
import { ISearchItem } from '../../../net/interfaces/ISearchItem';

const localMargin = 1;
const localPaperElevation = 4;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(3, 2)
    }
  })
);

function fetchDataFromServer(): ISearchItem[] {
  return [
    {
      date: new Date(),
      name: 'Иван Иванов',
      address: 'ул. Ленинградский проспект, д. 39, к. 1',
      avatar: 'some url',
      amountOfFreePlaces: 3
    },
    {
      date: new Date(),
      name: 'Марина Ушакова',
      address: 'ул. Ленинградский проспект, д. 39, к. 1',
      avatar: 'some url',
      amountOfFreePlaces: 3
    }
  ];
}

export const SearchTripPage: React.FC = props => {
  const classes = useStyles(props);
  const [searchButtonState, setSearchButtonState] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [progress, setProgress] = useState(true); // todo: must be false
  const [data, setData] = useState();
  const [addressFrom, handleAddressFrom] = useState('');
  const [addressTo, handleAddressTo] = useState('');

  useEffect(() => {
    if (progress) {
      setData(fetchDataFromServer());
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
          <Box m={localMargin}>
            <TextField
              fullWidth
              placeholder={'Откуда?'}
              variant={'outlined'}
              value={addressFrom}
              onChange={e => handleAddressFrom(e.target.value)}
            />
          </Box>
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