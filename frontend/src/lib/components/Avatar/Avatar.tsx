import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import clsx from 'clsx';

interface IAvatarProps {
  src?: string;
  variant?: 'rounded' | 'squared';
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    avatar: {
      margin: theme.spacing(2),
      [theme.breakpoints.down('sm')]: {
        width: '48px',
        height: '48px'
      },
      [theme.breakpoints.between('sm', 'lg')]: {
        width: '60px',
        height: '60px'
      },
      [theme.breakpoints.up['lg']]: {
        width: '80px',
        height: '80px'
      }
    },
    rounded: {
      borderRadius: '50%'
    },
    squared: {}
  })
);

export const MyAvatar: React.FC<IAvatarProps> = ({ src, variant, ...props }) => {
  const classes = useStyles(props);
  return (
    <img
      className={clsx(classes.avatar, variant === 'squared' ? classes.squared : classes.rounded)}
      src={src ? src : 'https://material-ui.com/static/images/avatar/1.jpg'}
    />
  );
};
