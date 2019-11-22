import React from 'react';
import {
  AppBar,
  Button,
  Container,
  createStyles,
  IconButton,
  makeStyles,
  Theme,
  Toolbar,
  Typography
} from '@material-ui/core';
import { connect } from 'react-redux';
import { logout } from '../../../net/auth/auth';
import { useHistory } from 'react-router-dom';
import MenuIcon from './menu-icon.svg';
import './MainContainer.scss';

interface IMainContainerProps {
  show?: boolean;
  search?: {
    onChange: (e: Event) => any;
    onSubmit: (e: Event) => any;
  };
  children?: React.ReactNode;
  onClick: () => any;
  role?: string;
  firstName: string;
  lastName: string;
  onLogout: () => any;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    logout: {
      position: 'absolute',
      right: theme.spacing(2)
    },
    toolbar: {
      position: 'relative'
    },
    container: {
      height: '90vh'
    }
  })
);

const MainContainer: React.FC<IMainContainerProps> = ({ show = true, onLogout, ...props }) => {
  const history = useHistory();
  const classes = useStyles(props);
  const logoutHandler = () => {
    logout().then(value => {
      if (value) {
        // console.log('Logged out');
      } else {
        // console.log('Log out error');
      }
    });
    history.push('/auth');
    onLogout();
  };

  if (!show) return <>{props.children}</>;
  const fullName = `${props.firstName} ${props.lastName}`;

  return (
    <div>
      <AppBar position={'static'}>
        <Toolbar className={classes.toolbar}>
          <IconButton edge={'start'} aria-label={'menu'} onClick={props.onClick}>
            <MenuIcon style={{ fill: 'white' }} />
          </IconButton>
          <Typography variant={'h5'}>
            {
              <div className="main-container__info">
                {fullName}{' '}
                {props.role === 'DRIVER' ? (
                  <div title="Водитель" className="main-container__driver-icon" />
                ) : props.role === 'PASSENGER' ? (
                  <div title="Пассажир" className="main-container__passenger-icon" />
                ) : null}
              </div>
            }
          </Typography>
          <Button className={classes.logout} onClick={logoutHandler}>
            Выйти
          </Button>
        </Toolbar>
      </AppBar>
      <Container className={classes.container}>{props.children}</Container>
    </div>
  );
};

const mapStateToProps = state => {
  // console.log(state);
  return {
    role: state.usr.role,
    firstName: state.usr.firstName,
    lastName: state.usr.lastName
  };
};

export default connect(mapStateToProps, null)(MainContainer);
