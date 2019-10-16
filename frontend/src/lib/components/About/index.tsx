import React from 'react';
import { Button, Container, makeStyles, Typography } from '@material-ui/core';
import { PROJECT_NAME } from '../../../config/names';

const useStyles = makeStyles({
  button: {
    textShadow: '0px 1px 10px rgba(0, 0, 0, 0.2), 0px 4px 5px rgba(0, 0, 0, 0.12), 0px 2px 4px rgba(0, 0, 0, 0.14);',
    color: 'white'
  },
  text: {
    color: 'white'
  }
});

const About: React.FC = props => {
  const classes = useStyles(props);

  return (
    <Container component={'footer'}>
      <Typography className={classes.text} variant={'body2'}>
        {PROJECT_NAME} Технотрек 2019.
      </Typography>
      <Button className={classes.button} variant={'text'}>
        О нас
      </Button>
      <Button className={classes.button} variant={'text'}>
        Обратная связь
      </Button>
    </Container>
  );
};

export default About;
