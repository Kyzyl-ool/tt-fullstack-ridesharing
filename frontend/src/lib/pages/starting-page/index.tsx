import React from 'react';
import {Backdrop, Box, Button, makeStyles, Typography} from '@material-ui/core';
import {PROJECT_NAME} from "../../../config/names";
import About from "../../components/About";
import {MainColor} from "../../themes/MainColor";

const useStyles = makeStyles({
  backdrop: {
    backgroundColor: MainColor[400]
  },
  heading: {
    textShadow: '0px 3px 5px rgba(0, 0, 0, 0.2), 0px 1px 18px rgba(0, 0, 0, 0.12), 0px 6px 10px rgba(0, 0, 0, 0.14);',
    paddingBottom: '80px'
  },
  button: {
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25);',
    borderRadius: '24px',
    border: '1px solid white',
    margin: '4px 0 4px 0'
  },
  buttonFocusVisible: {
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25);'
  },
  about: {
    position: 'absolute',
    bottom: '24px'
  }
})

const StartingPage: React.FC = (props) => {
  const classes = useStyles(props)

  return (
    <Backdrop className={classes.backdrop} open={true}>
      <Box display='flex' flexDirection={'column'}>
        <Typography className={classes.heading} variant={'h3'}>{PROJECT_NAME}</Typography>
        <Button className={classes.button}>Авторизация</Button>
        <Button className={classes.button}>Регистрация</Button>
        <Box className={classes.about}>
          <About/>
        </Box>
      </Box>
    </Backdrop>
  );
};

export default StartingPage;
