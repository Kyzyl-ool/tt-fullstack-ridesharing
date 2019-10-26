import React from 'react';
import { AppBar, Container, IconButton, Toolbar, Typography } from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import { connect } from 'react-redux';

interface IMainContainerProps {
  show?: boolean;
  heading?: string;
  search?: {
    onChange: (e: Event) => any;
    onSubmit: (e: Event) => any;
  };
  children?: React.ReactNode;
  onClick: () => any;
  role?: string;
}

const MainContainer: React.FC<IMainContainerProps> = ({ show = true, ...props }) => {
  if (!show) return <>{props.children}</>;
  // console.log(props.role);
  return (
    <div>
      <AppBar position={'static'}>
        <Toolbar>
          <IconButton edge={'start'} aria-label={'menu'} onClick={props.onClick}>
            <Menu style={{ color: 'white' }} />
          </IconButton>
          <Typography variant={'h5'}>
            {props.role === 'DRIVER' ? `${props.heading} (Водитель)` : `${props.heading}`}
          </Typography>
        </Toolbar>
      </AppBar>
      <Container>{props.children}</Container>
    </div>
  );
};

const mapStateToProps = state => {
  // console.log(state);
  return {
    role: state.usr.role
  };
};

export default connect(
  mapStateToProps,
  null
)(MainContainer);
