import React, { useState } from 'react';
import { Box, Button, createStyles, Divider, Drawer, makeStyles, Theme, Typography } from '@material-ui/core';
import { MyAvatar } from '../../components/Avatar/Avatar';
import { MyTrips } from '../MyTrips/MyTrips';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    avatar: {
      borderRadius: '50%',
      width: '60px',
      height: '60px'
    },
    root: {
      padding: theme.spacing(1)
    },
    buttons: {
      display: 'flex',
      flexDirection: 'column',
      padding: theme.spacing(1),
      justifyContent: 'space-between'
      // marginTop: theme.spacing(1)
    },
    button: {
      marginTop: theme.spacing(1)
    }
  })
);

interface IAppDrawerProps {
  name: string;
  email: string;
  trips: { name: string; date: Date; avatar: string }[];
}
export const AppDrawer: React.FC<IAppDrawerProps> = props => {
  const [open, setOpen] = useState(true);
  const classes = useStyles(props);
  const { name, email, trips } = props;

  return (
    <Drawer open={open} onClose={() => setOpen(false)}>
      <Box className={classes.root}>
        <MyAvatar src="https://material-ui.com/static/images/avatar/1.jpg" />
        <Box>
          <Typography variant={'h5'}>{name}</Typography>
          <Typography variant={'body1'}>{email}</Typography>
        </Box>
        <Divider />
        <Box className={classes.buttons}>
          <Button className={classes.button}>На главную</Button>
          <Button className={classes.button}>Мои организации</Button>
        </Box>
        <Divider />
        <Typography variant={'body1'} align={'center'}>{`Вы участвуете в ${trips.length} поездках:`}</Typography>
        <MyTrips data={props.trips} />
      </Box>
    </Drawer>
  );
};
