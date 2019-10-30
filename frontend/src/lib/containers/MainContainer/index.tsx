import React from 'react';
import { AppBar, Button, Container, IconButton, Toolbar, Typography } from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import { connect } from 'react-redux';
import { logout } from '../../../net/auth/auth';
import { useHistory } from 'react-router-dom';

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

const MainContainer: React.FC<IMainContainerProps> = ({ show = true, onLogout, ...props }) => {
  const history = useHistory();
  const logoutHandler = () => {
    logout().then(value => {
      if (value) {
        console.log('Logged out');
      } else {
        console.log('Log out error');
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
        <Toolbar>
          <IconButton edge={'start'} aria-label={'menu'} onClick={props.onClick}>
            <Menu style={{ color: 'white' }} />
          </IconButton>
          <Typography variant={'h5'}>{props.role === 'DRIVER' ? `${fullName} (Водитель)` : `${fullName}`}</Typography>
          <Button onClick={logoutHandler}>Выйти</Button>
        </Toolbar>
      </AppBar>
      <Container>{props.children}</Container>
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

export default connect(
  mapStateToProps,
  null
)(MainContainer);
