import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import clsx from 'clsx';
import placeholderUrl from './profile-placeholder-icon.svg';

interface IAvatarProps {
  src?: string;
  variant?: 'rounded' | 'squared';
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    avatar: {
      // margin: theme.spacing(2),
      [theme.breakpoints.down('sm')]: {
        width: '32px',
        height: '32px'
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

export const Avatar: React.FC<IAvatarProps> = ({ src, variant, ...props }) => {
  const classes = useStyles(props);
  return (
    <img
      className={clsx(classes.avatar, variant === 'squared' ? classes.squared : classes.rounded)}
      src={src ? src : placeholderUrl}
    />
  );
};
