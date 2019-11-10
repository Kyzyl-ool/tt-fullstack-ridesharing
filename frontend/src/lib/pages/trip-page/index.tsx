/* eslint-disable @typescript-eslint/camelcase */
import React, { useState, useEffect, Fragment } from 'react';
import _isEmpty from 'lodash/isEmpty';
import { Box, Button, Container, createStyles, makeStyles, Tab, Tabs, Theme, Typography } from '@material-ui/core';
import Map from '../../components/Map';
import dateFormat from 'date-fns/format';
import ruLocale from 'date-fns/locale/ru';
import { useParams, useHistory } from 'react-router-dom';
import TripModel from '../../models/tripModel';
import { snakeObjectToCamel } from '../../helpers/snakeToCamelCase';
import { connect } from 'react-redux';
import { IOrganization } from '../../domain/organization';

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
    mainInfo: {},
    time: {},
    tabs: {},
    tabContent: {
      height: '10%',
      width: '100%',
      objectFit: 'contain'
    },
    tabActions: {}
  })
);

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
}

const initialTripInfo = {
  hostDriverInfo: {
    first_name: '',
    last_name: ''
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
  December: 'декабря'
};

const TripPage: React.FC<ITripPageProps> = props => {
  const classes = useStyles(props);
  const [currentTab, setCurrentTab] = useState(0);
  const [tripInfo, setTripInfo] = useState({} as any);
  const params = useParams() as any;
  const history = useHistory();
  // console.log(params);

  const getTripInfo = async () => {
    return TripModel.getTripInfo(params.tripId);
  };

  useEffect(() => {
    (async function loadData() {
      const data = await getTripInfo();
      setTripInfo(snakeObjectToCamel(data));
    })();
  }, []);

  const onJoinTripButtonClick = async () => {
    await TripModel.joinTrip(tripInfo.id);
  };

  return (
    <Box display={'flex'} flexDirection={'column'} flexWrap={'nowrap'} height={'100%'}>
      {!_isEmpty(tripInfo) && (
        <Fragment>
          <Box className={classes.mainInfo}>
            <Typography
              variant={'h5'}
            >{`${tripInfo.hostDriverInfo.first_name} ${tripInfo.hostDriverInfo.last_name}`}</Typography>
            <Typography variant={'body1'}>{`От: ${
              props.availableOrganizations.find(org => org.id === tripInfo.startOrganizationId).name
            }`}</Typography>
            <Typography variant={'body1'}>{`До: ${tripInfo.stopAddress}`}</Typography>
          </Box>
          <Box className={classes.time}>
            <Typography variant={'h1'} display={'inline'}>
              {`${tripInfo.startTime.split(' ')[2]}`}
            </Typography>
            <Typography variant={'h4'} display={'inline'}>
              {`  ${tripInfo.startTime.split(' ')[0]} ${translateMonth[tripInfo.startTime.split(' ')[1]]}`}
            </Typography>
            {/* <Typography display={'inline'}>{`${dateFormat(tripInfo.startTime, `d' 'MMMM`, {
              locale: ruLocale
            })}`}</Typography> */}
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
              <Map onBuildingClick={() => {}} />
            </TabPanel>
            <TabPanel index={1} value={currentTab}>
              <Container>
                <Typography variant={'h4'}>Свободных мест: {tripInfo.totalSeats}</Typography>
                <Typography variant={'h5'}>Mazda RX-7 красный</Typography>
                <Typography>К 901 АУ</Typography>
                <Typography variant={'caption'}>Стоимость</Typography>
                <Typography variant={'h5'}>
                  <b>{tripInfo.cost ? `${tripInfo.cost} ₽` : 'По усмотрению пассажира'}</b>
                </Typography>
              </Container>
            </TabPanel>
            <TabPanel index={2} value={currentTab}>
              <Typography variant={'caption'}>Контактный телефон</Typography>
              <Typography variant={'h5'}>+7(999)123-45-56</Typography>

              <Typography variant={'caption'}>VK</Typography>
              <Typography variant={'h5'}>@ivan_ivanov</Typography>

              <Typography variant={'caption'}>TELEGRAM</Typography>
              <Typography variant={'h5'}>@ivan_ivanov</Typography>
            </TabPanel>
          </Box>
          <Box className={classes.tabActions}>
            <Button onClick={() => history.goBack()} variant={'text'}>
              Назад
            </Button>
            <Button onClick={onJoinTripButtonClick} variant={'contained'}>
              Присоединиться
            </Button>
          </Box>
        </Fragment>
      )}
    </Box>
  );
};

const mapStateToProps = state => {
  return {
    availableOrganizations: state.org.organizations
  };
};

export default connect(
  mapStateToProps,
  null
)(TripPage);
