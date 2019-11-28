/* eslint-disable @typescript-eslint/camelcase */
import React, { Fragment, useEffect, useState } from 'react';
import _isEmpty from 'lodash/isEmpty';
import { Box, Button, Container, createStyles, makeStyles, Tab, Tabs, Theme, Typography } from '@material-ui/core';
import Map from '../../components/Map';
import { useHistory, useParams } from 'react-router-dom';
import TripModel from '../../models/tripModel';
import addNotification from '../../store/actions/notificationsActions';
import { snakeObjectToCamel } from '../../helpers/snakeToCamelCase';
import { connect } from 'react-redux';
import { IOrganization } from '../../domain/organization';
import { setMyTripsAction } from '../../store/actions';
import { Avatar } from '../../components/Avatar/Avatar';
import { IResponseTrip } from '../../store/reducers/allTripsReducer';

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
      display: 'flex',
      alignItems: 'center',
      maxWidth: '330px',
      flexDirection: 'column',
      justifyContent: 'space-between',
      margin: '10px 0'
    },
    buttons: {
      width: '300px',
      display: 'flex',
      justifyContent: 'space-between',
      alignSelf: 'center',
      margin: '24px 0'
    },
    finishButton: {
      background: 'green'
    },
    tabContainer: {},
    mapContainer: {},
    avatars: {
      padding: 0,
      marginTop: '15px',
      display: 'flex',
      flexWrap: 'wrap'
    },
    tabs: {
      border: '1px solid rgba(0,0,0,0.3)',
      borderRadius: '4px 4px 0 0'
    },
    tabContent: {
      objectFit: 'contain',
      border: '1px solid rgba(0,0,0,0.3)',
      borderTop: 'none',
      borderRadius: '0 0 4px 4px',
      paddingBottom: '24px'
    },
    avatarContainer: {
      marginRight: '5px'
    },
    tabActions: {},
    subheader: {
      backgroundColor: 'rgba(0,0,0,0.04)',
      color: 'rgba(0,0,0,0.5)',
      marginTop: '16px'
    }
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
  setMyTrips: (trips: IResponseTrip) => void;
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

  const refreshTrips = async () => {
    const trips = await TripModel.getMyTrips();
    props.setMyTrips(trips);
  };

  const onLeaveTripButtonClick = async () => {
    const res = await TripModel.leaveTrip(tripInfo.id);
    if (res) {
      refreshTripInfo();
      props.addNotification({ type: 'success', text: 'Вы успешно покинули поездку' });
    } else {
      props.addNotification({ type: 'failure', text: 'Покинуть поездку не удалось' });
    }
    await refreshTrips();
  };

  const onJoinTripButtonClick = async () => {
    const res = await TripModel.joinTrip(tripInfo.id);
    if (res) {
      refreshTripInfo();
      props.addNotification({ type: 'success', text: 'Вы успешно присоединились к поездке' });
    } else {
      props.addNotification({ type: 'failure', text: 'Присоединится к поездке не удалось' });
    }
    await refreshTrips();
  };

  const onFinishTrip = async (tripId: number) => {
    const res = await TripModel.finishTrip(tripId);
    if (res) {
      refreshTripInfo();
      props.addNotification({ type: 'success', text: 'Поздравляем! Поездка завершена!' });
    } else {
      props.addNotification({ type: 'failure', text: 'Поездка не может быть завершена в данный момент' });
    }
    await refreshTrips();
  };

  const isUserInsideTrip = tripInfo => tripInfo.passengers.includes(props.userId);
  const startOrganization = props.availableOrganizations[tripInfo.startOrganizationId + 1];
  // console.log(startOrganization)
  const renderActivityButton = tripInfo => {
    if (tripInfo.isMine && !tripInfo.isFinished) {
      return (
        <Button className={classes.finishButton} onClick={() => onFinishTrip(tripInfo.id)} variant={'contained'}>
          Завершить поездку
        </Button>
      );
    } else if (tripInfo.isMine && tripInfo.isFinished) {
      return null;
    } else if (isUserInsideTrip(tripInfo)) {
      return (
        <Button onClick={onLeaveTripButtonClick} variant={'contained'}>
          Выйти из поездки
        </Button>
      );
    } else if (!isUserInsideTrip(tripInfo)) {
      return (
        <Button onClick={onJoinTripButtonClick} variant={'contained'}>
          Присоединиться
        </Button>
      );
    }
  };

  // const isUserTripOwner = tripInfo => tripInfo.hostDriverId === props.userId;
  return (
    <Box className={classes.mainInfo} display={'flex'} flexDirection={'column'} flexWrap={'nowrap'} height={'95%'}>
      {!_isEmpty(tripInfo) && (
        <Fragment>
          <Box display={'flex'} flexDirection={'column'}>
            <Box display={'flex'} flexWrap={'wrap'} justifyContent={'space-evenly'} my={3}>
              <Box display={'flex'} alignItems={'center'}>
                <Box mx={3}>
                  <Avatar src={tripInfo.hostDriverInfo.photoUrl} />
                </Box>
                <Box display={'flex'} flexDirection={'column'} justifyContent={'center'}>
                  <Typography
                    variant={'h5'}
                  >{`${tripInfo.hostDriverInfo.firstName} ${tripInfo.hostDriverInfo.lastName}`}</Typography>
                  <Typography variant={'body1'}>{`От: ${
                    props.availableOrganizations.find(org => org.id === tripInfo.startOrganizationId).name
                  }`}</Typography>
                  <Typography variant={'body1'}>{`До: ${tripInfo.stopAddress}`}</Typography>
                </Box>
              </Box>
              <Box className={classes.time}>
                <Typography variant={'h2'}>{`${tripInfo.startTime.split(' ')[2]}`}</Typography>
                <Typography variant={'h4'}>
                  {`  ${tripInfo.startTime.split(' ')[0]} ${translateMonth[tripInfo.startTime.split(' ')[1]]}`}
                </Typography>
              </Box>
            </Box>
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
                <Box textAlign={'center'} display={'flex'} flexWrap={'wrap'} justifyContent={'space-evenly'}>
                  <Box display={'flex'} flexDirection={'column'} flexGrow={2}>
                    <Typography variant={'caption'} className={classes.subheader}>
                      ТРАНСПОРТ
                    </Typography>
                    <Typography variant={'h6'}>Mazda RX-7 красный</Typography>
                    <Typography>К 901 АУ</Typography>
                  </Box>
                  <Box display={'flex'} flexDirection={'column'} flexGrow={2}>
                    <Typography variant={'caption'} className={classes.subheader}>
                      СТОИМОСТЬ
                    </Typography>
                    <Typography variant={'h6'}>
                      <b>{tripInfo.cost ? `${tripInfo.cost} ₽` : 'По усмотрению пассажира'}</b>
                    </Typography>
                  </Box>
                </Box>
              </Container>
              <Container className={classes.tabContainer}>
                <Box display={'flex'} flexDirection={'column'} textAlign={'center'}>
                  <Typography variant={'caption'} className={classes.subheader}>
                    УЧАСТНИКИ ПОЕЗДКИ
                  </Typography>
                  {!_isEmpty(passengers) ? (
                    <>
                      {isUserInsideTrip(tripInfo) || tripInfo.isMine ? (
                        <Container className={classes.avatars}>
                          <Box display={'flex'} justifyContent={'space-evenly'} width={'100%'}>
                            {passengers.map((passenger, index) => (
                              <Box className={classes.avatarContainer} key={index}>
                                <Avatar
                                  title={`${passenger.firstName} ${passenger.lastName}`}
                                  src={passenger.photoUrl}
                                />
                                <Typography variant={'body2'}>{passenger.firstName}</Typography>
                              </Box>
                            ))}
                          </Box>
                        </Container>
                      ) : (
                        <p>Чтобы увидеть попутчиков, нужно вступить в поездку</p>
                      )}
                    </>
                  ) : (
                    <p>Пока попутчиков нет</p>
                  )}
                </Box>
              </Container>
            </TabPanel>
            <TabPanel index={2} value={currentTab}>
              {isUserInsideTrip(tripInfo) || tripInfo.isMine ? (
                <Container className={classes.tabContainer}>
                  <Box display={'flex'} flexWrap={'wrap'}>
                    <Box display={'flex'} flexDirection={'column'} flexGrow={2}>
                      <Typography variant={'caption'} className={classes.subheader}>
                        КОНТАКТНЫЙ ТЕЛЕФОН
                      </Typography>
                      <Typography variant={'h6'}>{tripInfo.phoneNumber ? tripInfo.phoneNumber : '—'}</Typography>
                    </Box>
                    <Box display={'flex'} flexDirection={'column'} flexGrow={2}>
                      <Typography variant={'caption'} className={classes.subheader}>
                        VK
                      </Typography>
                      <Typography variant={'h6'}>{tripInfo.vk ? tripInfo.vk : '—'}</Typography>
                    </Box>
                    <Box display={'flex'} flexDirection={'column'} flexGrow={2}>
                      <Typography variant={'caption'} className={classes.subheader}>
                        EMAIL
                      </Typography>
                      <Typography variant={'h6'}>{tripInfo.hostDriverInfo.email}</Typography>
                    </Box>
                  </Box>
                </Container>
              ) : (
                <p>Чтобы увидеть контакты водителя, нужно состоять в поездке</p>
              )}
            </TabPanel>
          </Box>
          <Box className={classes.buttons}>
            <Button onClick={() => history.push('/search_trip')} variant={'text'}>
              Назад
            </Button>
            {renderActivityButton(tripInfo)}
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

const mapDispatchToProps = dispatch => ({
  addNotification: ({ type, text }) => dispatch(addNotification({ type, text })),
  setMyTrips: trips => dispatch(setMyTripsAction(trips))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TripPage);
