/* eslint-disable @typescript-eslint/camelcase */
import React, { useState, useEffect, Fragment } from 'react';
import _isEmpty from 'lodash/isEmpty';
import { Box, Button, Container, createStyles, makeStyles, Tab, Tabs, Theme, Typography } from '@material-ui/core';
import Map from '../../components/Map';
import dateFormat from 'date-fns/format';
import ruLocale from 'date-fns/locale/ru';
import { useParams, useHistory } from 'react-router-dom';
import TripModel from '../../models/tripModel';
import addNotification from '../../store/actions/notificationsActions';
import { snakeObjectToCamel } from '../../helpers/snakeToCamelCase';
import { connect } from 'react-redux';
import { IOrganization } from '../../domain/organization';
import { Avatar } from '../../components/Avatar/Avatar';

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  if (value !== index) return null;
  else return <>{children}</>;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    mainInfo: {
      marginTop: '10px'
    },
    time: {
      flexWrap: 'wrap',
      display: 'flex',
      alignItems: 'baseline',
      maxWidth: '330px',
      justifyContent: 'space-between',
      margin: '10px 0'
    },
    buttons: {
      display: 'flex',
      maxWidth: '270px',
      justifyContent: 'space-between'
    },
    tabContainer: {
      paddingTop: '20px'
    },
    mapContainer: {
      maxHeight: '30vh'
    },
    avatars: {
      padding: 0,
      marginTop: '15px',
      display: 'flex',
      flexWrap: 'wrap'
    },
    tabs: {},
    tabContent: {
      height: '10%',
      width: '100%',
      objectFit: 'contain'
    },
    avatarContainer: {
      marginRight: '5px'
    },
    tabActions: {}
  })
);

interface INotification {
  text: string;
  type: 'success' | 'failure';
}

interface ITripPageProps {
  data: {
    name: string;
    from: string;
    to: string;
    time: Date;
    amountOfFreeSpaces: number;
    cost: number;
  };
  availableOrganizations: IOrganization[];
  userId: number;
  addNotification: (notification: INotification) => void;
}

const initialTripInfo = {
  hostDriverInfo: {
    firstName: '',
    lastName: ''
  },
  startOrganizationId: '',
  startTime: '',
  stopAddress: '',
  totalSeats: '',
  cost: ''
};

//TODO REMOVE IT AFTER
const translateMonth = {
  October: 'октября',
  December: 'декабря',
  January: 'января',
  November: 'ноября',
  July: 'июля',
  June: 'июня',
  August: 'августа',
  September: 'сентября',
  March: 'марта',
  April: 'апреля',
  May: 'мая',
  February: 'февраля'
};

const TripPage: React.FC<ITripPageProps> = props => {
  const classes = useStyles(props);
  const [currentTab, setCurrentTab] = useState(0);
  const [tripInfo, setTripInfo] = useState({} as any);
  const [passengers, setPassengers] = useState([]);
  const params = useParams() as any;
  const history = useHistory();

  const getTripInfo = async () => {
    const res = await TripModel.getTripInfo(params.tripId);
    if (res) {
      const fetchedPassengers = await TripModel.getPassengersInfo(res.passengers);
      if (fetchedPassengers) {
        setPassengers(fetchedPassengers.map(pass => snakeObjectToCamel(pass)));
      }
    }
    return res;
  };

  useEffect(() => {
    (async function loadData() {
      const data = await getTripInfo();
      setTripInfo(snakeObjectToCamel(data));
    })();
  }, []);

  const refreshTripInfo = async () => {
    const renewedData = await getTripInfo();
    setTripInfo(snakeObjectToCamel(renewedData));
    const fetchedPassengers = await TripModel.getPassengersInfo(renewedData.passengers);
    if (fetchedPassengers) {
      setPassengers(fetchedPassengers.map(pass => snakeObjectToCamel(pass)));
    }
  };

  const onLeaveTripButtonClick = async () => {
    const res = await TripModel.leaveTrip(tripInfo.id);
    if (res) {
      refreshTripInfo();
      props.addNotification({ type: 'success', text: 'Вы успешно покинули поездку' });
    } else {
      props.addNotification({ type: 'failure', text: 'Покинуть поездку не удалось' });
    }
  };

  const onJoinTripButtonClick = async () => {
    const res = await TripModel.joinTrip(tripInfo.id);
    if (res) {
      refreshTripInfo();
      props.addNotification({ type: 'success', text: 'Вы успешно присоединились к поездке' });
    } else {
      props.addNotification({ type: 'failure', text: 'Присоединится к поездке не удалось' });
    }
  };

  const startOrganization = props.availableOrganizations[tripInfo.startOrganizationId - 1];
  const isUserInsideTrip = tripInfo => tripInfo.passengers.includes(props.userId);
  return (
    <Box className={classes.mainInfo} display={'flex'} flexDirection={'column'} flexWrap={'nowrap'} height={'95%'}>
      {!_isEmpty(tripInfo) && (
        <Fragment>
          <Box>
            <Typography
              variant={'h5'}
            >{`${tripInfo.hostDriverInfo.firstName} ${tripInfo.hostDriverInfo.lastName}`}</Typography>
            <Typography variant={'body1'}>{`От: ${
              props.availableOrganizations.find(org => org.id === tripInfo.startOrganizationId).name
            }`}</Typography>
            <Typography variant={'body1'}>{`До: ${tripInfo.stopAddress}`}</Typography>
          </Box>
          <Box className={classes.time}>
            <Typography variant={'h2'} display={'inline'}>
              {`${tripInfo.startTime.split(' ')[2]}`}
            </Typography>
            <Typography variant={'h4'} display={'inline'}>
              {`  ${tripInfo.startTime.split(' ')[0]} ${translateMonth[tripInfo.startTime.split(' ')[1]]}`}
            </Typography>
          </Box>
          <Box className={classes.buttons}>
            <Button onClick={() => history.push('/search_trip')} variant={'text'}>
              Назад
            </Button>
            {!isUserInsideTrip(tripInfo) ? (
              <Button onClick={onJoinTripButtonClick} variant={'contained'}>
                Присоединиться
              </Button>
            ) : (
              <Button onClick={onLeaveTripButtonClick} variant={'contained'}>
                Выйти из поездки
              </Button>
            )}
          </Box>
          <Tabs
            className={classes.tabs}
            variant={'fullWidth'}
            value={currentTab}
            onChange={(e, value) => setCurrentTab(value)}
            indicatorColor={'primary'}
          >
            <Tab label={'На карте'} />
            <Tab label={'Поездка'} />
            <Tab label={'Контакты'} />
          </Tabs>
          <Box className={classes.tabContent}>
            <TabPanel value={currentTab} index={0}>
              <Box className={classes.mapContainer}>
                <Map
                  withRoute
                  geopositionCentered={false}
                  startPoint={{ latitude: startOrganization.latitude, longitude: startOrganization.longitude }}
                  endPoint={{ latitude: tripInfo.stopLatitude, longitude: tripInfo.stopLongitude }}
                  viewport={{ latitude: startOrganization.latitude, longitude: startOrganization.longitude, zoom: 10 }}
                  style={{ width: '100%', height: '40vh' }}
                  onBuildingClick={() => {}}
                />
              </Box>
            </TabPanel>
            <TabPanel index={1} value={currentTab}>
              <Container className={classes.tabContainer}>
                <Typography variant={'h5'}>Свободных мест: {tripInfo.seatsAvailable}</Typography>
                <Typography variant={'h6'}>Mazda RX-7 красный</Typography>
                <Typography>К 901 АУ</Typography>
                <Typography variant={'caption'}>Стоимость</Typography>
                <Typography variant={'h6'}>
                  <b>{tripInfo.cost ? `${tripInfo.cost} ₽` : 'По усмотрению пассажира'}</b>
                </Typography>
              </Container>
              <Container className={classes.tabContainer}>
                <Typography variant={'h5'}>Попутчики в поездке:</Typography>
                <>
                  {isUserInsideTrip(tripInfo) ? (
                    <Container className={classes.avatars}>
                      {passengers.map((passenger, index) => (
                        <Box className={classes.avatarContainer} key={index}>
                          <Avatar title={`${passenger.firstName} ${passenger.lastName}`} src={passenger.photoUrl} />
                        </Box>
                      ))}
                    </Container>
                  ) : (
                    <p>Чтобы увидеть попутчиков, нужно вступить в поездку</p>
                  )}
                </>
              </Container>
            </TabPanel>
            <TabPanel index={2} value={currentTab}>
              {isUserInsideTrip(tripInfo) ? (
                <Container className={classes.tabContainer}>
                  <Typography variant={'caption'}>Контактный телефон</Typography>
                  <Typography variant={'h6'}>{tripInfo.phoneNumber ? tripInfo.phoneNumber : '—'}</Typography>

                  <Typography variant={'caption'}>VK</Typography>
                  <Typography variant={'h6'}>{tripInfo.vk ? tripInfo.vk : '—'}</Typography>

                  <Typography variant={'caption'}>E-mail</Typography>
                  <Typography variant={'h6'}>{tripInfo.hostDriverInfo.email}</Typography>
                </Container>
              ) : (
                <p>Чтобы увидеть контакты водителя, нужно состоять в поездке</p>
              )}
            </TabPanel>
          </Box>
        </Fragment>
      )}
    </Box>
  );
};

const mapStateToProps = state => {
  return {
    userId: state.usr.id,
    availableOrganizations: state.org.organizations
  };
};

const mapDispatchToProps = {
  addNotification
};

export default connect(mapStateToProps, mapDispatchToProps)(TripPage);
