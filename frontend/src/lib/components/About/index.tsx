import React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import {Button, Container, makeStyles, Typography} from "@material-ui/core";
import {PROJECT_NAME} from "../../../config/names";
import {AboutTheme} from "../../themes/About";

const useStyles = makeStyles({
  button: {
    textShadow: '0px 1px 10px rgba(0, 0, 0, 0.2), 0px 4px 5px rgba(0, 0, 0, 0.12), 0px 2px 4px rgba(0, 0, 0, 0.14);'
  },
})

const About: React.FC = (props) => {
  const classes = useStyles(props)

  return <ThemeProvider theme={AboutTheme}>
    <Container component={'footer'}>
      <Typography variant={"body2"}>{PROJECT_NAME} Технотрек 2019.</Typography>
      <Button className={classes.button} variant={"text"}>О нас</Button>
      <Button className={classes.button} variant={"text"}>Обратная связь</Button>
    </Container>
  </ThemeProvider>;
};

export default About;
