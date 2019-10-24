import React, { useState } from 'react';
import { Box, Button, CardMedia, createStyles, makeStyles, Tab, Tabs, Theme, Typography } from '@material-ui/core';
import dateFormat from 'date-fns/format';
import ruLocale from 'date-fns/locale/ru';

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
}

export const TripPage: React.FC<ITripPageProps> = props => {
  const classes = useStyles(props);
  const [currentTab, setCurrentTab] = useState(0);

  return (
    <Box display={'flex'} flexDirection={'column'} flexWrap={'nowrap'} height={'100%'}>
      <Box className={classes.mainInfo}>
        <Typography variant={'h5'}>{props.data.name}</Typography>
        <Typography variant={'body1'}>{`От: ${props.data.from}`}</Typography>
        <Typography variant={'body1'}>{`До: ${props.data.to}`}</Typography>
      </Box>
      <Box className={classes.time}>
        <Typography variant={'h1'} display={'inline'}>
          {`${dateFormat(props.data.time, `HH':'mm`)}`}
        </Typography>
        <Typography display={'inline'}>{`${dateFormat(props.data.time, `d' 'MMMM`, { locale: ruLocale })}`}</Typography>
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
          <img
            src={'https://mir-cdn.behance.net/v1/rendition/projects/max_808/f143f651301549.Y3JvcCw1MDEsMzkyLDAsNTQ.jpg'}
          />
        </TabPanel>
      </Box>
      <Box className={classes.tabActions}>
        <Button variant={'text'}>Назад</Button>
        <Button variant={'contained'}>Присоединиться</Button>
      </Box>
    </Box>
  );
};
