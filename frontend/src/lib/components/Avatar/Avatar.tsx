import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core';

interface IAvatarProps {
  src: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    avatar: {
      margin: theme.spacing(2),
      borderRadius: '50%',
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
    }
  })
);

export const MyAvatar: React.FC<IAvatarProps> = props => {
  const classes = useStyles(props);

  return <img className={classes.avatar} src={props.src} />;
};
