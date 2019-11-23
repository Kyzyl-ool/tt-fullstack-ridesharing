import React from 'react';
import _isEmpty from 'lodash/isEmpty';
import { Box, Card, CardContent, createStyles, makeStyles, Theme, Typography } from '@material-ui/core';
import dateFnsFormat from 'date-fns/format';
import ruLocale from 'date-fns/locale/ru';
import { Avatar } from '../Avatar/Avatar';
import { NavLink } from 'react-router-dom';
import './SearchResultItem.scss';

const translateMonth = {
  October: 'октября',
  December: 'декабря',
  January: 'января',
  November: 'ноября',
  July: 'июля',
  June: 'июня',
  August: 'августа',
  September: 'сентября',
  March: 'марта',
  April: 'апреля',
  May: 'мая',
  February: 'февраля'
};

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
    },
    noTextDecoration: {
      textDecoration: 'none'
    },
    seatIcons: {
      marginLeft: '1em'
    }
  })
);

interface ISearchResultItemProps {
  id: string;
  date: Date;
  name: string;
  address: string;
  avatar: string;
  amountOfFreePlaces: number;
  amountOfTakenPlaces: number;
}

export const SearchResultItem: React.FC<ISearchResultItemProps> = props => {
  const classes = useStyles(props);
  return (
    <Card className={classes.card}>
      <NavLink to={`/trip/${props.id}`} className={classes.noTextDecoration}>
        <CardContent>
          <Box textAlign={'left'}>
            <Typography variant={'body1'} color={'textSecondary'}>
              {`${props.date
                .toString()
                .split(' ')
                .map((item, index) => (index === 1 ? translateMonth[item] : item))
                .join(' ')}`}
            </Typography>
            <Typography variant={'h5'} color={'textPrimary'}>
              {`${props.name}`}
            </Typography>
          </Box>
          <Box className={classes.space} />
          <Box display={'flex'} flexDirection={'row'} alignItems={'center'} className={classes.bottom}>
            {/* <Typography variant={'h5'} color={'textSecondary'}>
              {props.amountOfFreePlaces}
            </Typography> */}
            <Typography variant={'body2'} color={'textSecondary'}>
              {`${props.address}`}
            </Typography>
            <Box className={classes.seatIcons} display="flex">
              {props.amountOfFreePlaces &&
                Array(props.amountOfFreePlaces)
                  .fill(null)
                  .map((item, index) => <span key={index} className="search-result-item__seat-icon" />)}
              {props.amountOfTakenPlaces !== 0 &&
                Array(props.amountOfTakenPlaces)
                  .fill(null)
                  .map((item, index) => <span key={index} className="search-result-item__taken-place-icon" />)}
            </Box>
          </Box>
          <Box className={classes.rightTopElement}>
            <Avatar src={'https://material-ui.com/static/images/avatar/1.jpg'} />
          </Box>
        </CardContent>
      </NavLink>
    </Card>
  );
};
