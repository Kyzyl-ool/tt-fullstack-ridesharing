import React from 'react';
import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core';
import { Menu } from '@material-ui/icons';

interface IMainContainerProps {
  heading?: string;
  search?: {
    onChange: (e: Event) => any;
    onSubmit: (e: Event) => any;
  };
  children?: React.ReactNode;
}

export const MainContainer: React.FC<IMainContainerProps> = props => {
  return (
    <div>
      <AppBar position={'static'}>
        <Toolbar>
          <IconButton edge={'start'} aria-label={'menu'}>
            <Menu style={{ color: 'white' }} />
          </IconButton>
          <Typography variant={'h5'}>{props.heading}</Typography>
        </Toolbar>
      </AppBar>
      {props.children}
    </div>
  );
};
