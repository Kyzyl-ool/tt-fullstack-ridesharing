import React, { useState } from 'react';
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
import { useHistory, useLocation } from 'react-router-dom';
import UserModel from '../../models/userModel';
import { PROJECT_NAME } from '../../../config/names';
import { authHandler } from '../../../net/auth/auth';
import { connect } from 'react-redux';
import { setOrganizationsAction, setUserDataAction } from '../../store/actions';

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

interface IAuthPageProps {
  onSuccess: () => any;
  onAuth: (isAuth: boolean) => void;
}

const AuthPage: React.FC<IAuthPageProps> = props => {
  const classes = useStyles(props);
  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  const location = useLocation();

  const onSuccess = value => {
    setLoading(false);
    props.onSuccess();
    const { from } = location.state || { from: { pathname: '/main' } };
    console.log(from);
    history.replace(from);
  };
  const onFail = () => {
    setLoading(false);
    setOpenSnackbar(true);
  };

  const authorizeUser = async ({ login, password }: { login: string; password: string }): Promise<any> => {
    return UserModel.authorize({ login, password });
  };

  const initializeUser = async ({ login, password }: { login: string; password: string }): Promise<any> => {
    await authorizeUser({ login, password });
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
          label={'email'}
          variant={'outlined'}
          placeholder={'Введите ваш email'}
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
            authHandler(initializeUser({ login, password }), onSuccess, onFail);
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

const mapStateToProps = state => {
  return {};
  // console.log(state);
  // return {
  //   role: state.usr.role
  // };
};

const mapDispatchToProps = dispatch => {
  return {
    onInitUser: () => dispatch(setUserDataAction),
    onInitOrganizations: () => dispatch(setOrganizationsAction)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthPage);
