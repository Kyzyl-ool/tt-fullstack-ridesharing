import React, { useState } from 'react';
import axios from 'axios';
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  makeStyles,
  Snackbar,
  TextField,
  Typography
} from '@material-ui/core';
import { PROJECT_NAME } from '../../../config/names';
import { authHandler, authorize } from '../../../net/auth/auth';
import { connect } from 'react-redux';
import Cookies from 'js-cookie';

const useStyles = makeStyles({
  heading: {
    paddingBottom: '64px'
  },
  form: {
    margin: '4px 0 4px 0',
    width: '280px'
  },
  button: {
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25);',
    margin: '40px 0 4px 0',
    width: '200px'
  },
  progress: {
    position: 'absolute',
    bottom: '48px'
  }
});

interface IAuthPage {
  onSuccess: () => any;
}

const AuthPage: React.FC<IAuthPage> = props => {
  const classes = useStyles(props);
  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const onSuccess = value => {
    console.log(value);
    setLoading(false);
    props.onSuccess();
  };
  const onFail = () => {
    setLoading(false);
    setOpenSnackbar(true);
  };

  const authorizeAxios = async ({ login, password }: { login: string; password: string }): Promise<any> => {
    return await axios.post('http://localhost:5000/login', { login, password }, { withCredentials: true });
  };

  const initUserData = async (login: string) => {
    const res = await axios.get(`http://localhost:5000/get_user_data`);
    console.log(res);
  };

  const authorize = async ({ login, password }: { login: string; password: string }): Promise<any> => {
    await authorizeAxios({ login, password });
    await initUserData(login);
  };

  return (
    <Backdrop open={true}>
      <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
        <Typography className={classes.heading} variant={'h4'}>
          {PROJECT_NAME}
        </Typography>
        <TextField
          onChange={event => setLogin(event.target.value)}
          value={login}
          className={classes.form}
          label={'Логин'}
          variant={'outlined'}
          placeholder={'Введите логин'}
        />
        <TextField
          onChange={event => setPassword(event.target.value)}
          value={password}
          className={classes.form}
          label={'Пароль'}
          variant={'outlined'}
          placeholder={'Введите пароль'}
          type={'password'}
        />
        <Button
          onClick={() => {
            setLoading(true);
            authHandler(authorizeAxios({ login, password }), onSuccess, onFail);
          }}
          variant={'contained'}
          className={classes.button}
        >
          Войти
        </Button>
        {loading && <CircularProgress className={classes.progress} />}
      </Box>
      <Snackbar
        open={openSnackbar}
        message={'Неверная пара логин-пароль'}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
      />
    </Backdrop>
  );
};

export default AuthPage;