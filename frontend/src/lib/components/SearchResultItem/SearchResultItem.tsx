import React from 'react';
import { Box, Card, CardContent, createStyles, makeStyles, Theme, Typography } from '@material-ui/core';
import dateFnsFormat from 'date-fns/format';
import ruLocale from 'date-fns/locale/ru';
import { MyAvatar } from '../Avatar/Avatar';
import { NavLink } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      margin: theme.spacing(1),
      border: `1px solid ${theme.palette.primary.light}`,
      position: 'relative',
      cursor: 'pointer',
      paddingBottom: theme.spacing(1)
    },
    space: {
      height: theme.spacing(1),
      width: '100%'
    },
    bottom: {
      position: 'absolute',
      bottom: theme.spacing(1)
    },
    rightTopElement: {
      position: 'absolute',
      top: 0,
      right: 0
    }
  })
);

interface ISearchResultItemProps {
  date: Date;
  name: string;
  address: string;
  avatar: string;
  amountOfFreePlaces: number;
}

export const SearchResultItem: React.FC<ISearchResultItemProps> = props => {
  const classes = useStyles(props);

  return (
    <Card className={classes.card}>
      <NavLink to={'/trip/1'}>
        <CardContent>
          <Box textAlign={'left'}>
            <Typography variant={'body1'} color={'textSecondary'}>
              {`${dateFnsFormat(props.date, `d MMMM HH':'mm`, { locale: ruLocale })}`}
            </Typography>
            <Typography variant={'h5'} color={'textPrimary'}>
              {`${props.name}`}
            </Typography>
          </Box>
          <Box className={classes.space} />
          <Box display={'flex'} flexDirection={'row'} alignItems={'center'} className={classes.bottom}>
            <Typography variant={'h5'} color={'textSecondary'}>
              {props.amountOfFreePlaces}
            </Typography>
            &nbsp; &nbsp;
            <Typography variant={'body2'} color={'textSecondary'}>
              {`${props.address}`}
            </Typography>
          </Box>
          <Box className={classes.rightTopElement}>
            <MyAvatar src={'https://material-ui.com/static/images/avatar/1.jpg'} />
          </Box>
        </CardContent>
      </NavLink>
    </Card>
  );
};
