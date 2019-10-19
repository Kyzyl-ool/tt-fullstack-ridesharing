import React from 'react';
import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core';
import { Menu } from '@material-ui/icons';

interface IMainContainerProps {
  show?: boolean;
  heading?: string;
  search?: {
    onChange: (e: Event) => any;
    onSubmit: (e: Event) => any;
  };
  children?: React.ReactNode;
  onClick: () => any;
}

export const MainContainer: React.FC<IMainContainerProps> = ({ show = true, ...props }) => {
  if (!show) return <>{props.children}</>;
  return (
    <div>
      <AppBar position={'static'}>
        <Toolbar>
          <IconButton edge={'start'} aria-label={'menu'} onClick={props.onClick}>
            <Menu style={{ color: 'white' }} />
          </IconButton>
          <Typography variant={'h5'}>{props.heading}</Typography>
        </Toolbar>
      </AppBar>
      {props.children}
    </div>
  );
};
