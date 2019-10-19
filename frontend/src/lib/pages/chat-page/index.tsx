import React from 'react';
import clsx from 'clsx';
import { Container, createStyles, makeStyles, Paper, TextField, Theme } from '@material-ui/core';
import { MainColor } from '../../themes/MainColor';
import Message from '../../components/message';

interface IMessage {
  from: number;
  time: string;
  message: string;
}

interface IChatPageProps {
  title: string;
  messages: Array<IMessage>;
  participants: Array<number>;
  myId: number;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    chat: {
      paddingBottom: theme.spacing(2)
    },
    dense: {
      marginTop: theme.spacing(2)
    },
    message: {
      margin: theme.spacing(1),
      backgroundColor: MainColor[50]
    },
    messageForm: {
      [theme.breakpoints.down('sm')]: {
        width: '70%'
      },
      [theme.breakpoints.between('sm', 'lg')]: {
        width: '60%'
      },
      [theme.breakpoints.up['lg']]: {
        width: '50%'
      },
      margin: theme.spacing(2)
    },
    messageFormContainer: {
      position: 'fixed',
      bottom: 0,
      marginLeft: -theme.spacing(2),
      width: '100%',
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: theme.palette.divider
    }
  })
);

const ChatPage: React.FC<IChatPageProps> = props => {
  const classes = useStyles(props);

  return (
    <Container>
      <Paper className={classes.chat}>
        {props.messages
          .reduce((previousValue, currentValue, currentIndex, array) => {
            const newValue = previousValue;
            newValue.push({
              lastSenderId: array[currentIndex].from,
              component: (
                <Message
                  first={
                    !previousValue.length
                      ? true
                      : previousValue[previousValue.length - 1].lastSenderId !== array[currentIndex].from
                  }
                  last={
                    array.length === currentIndex
                      ? true
                      : !array[currentIndex + 1] || array[currentIndex].from !== array[currentIndex + 1].from
                  }
                  body={array[currentIndex].message}
                  time={array[currentIndex].time}
                  mine={array[currentIndex].from === props.myId}
                />
              )
            });
            return newValue;
          }, [])
          .map(value => value.component)}
      </Paper>
      <Paper className={classes.messageFormContainer}>
        <TextField
          label="Введите сообщение..."
          className={clsx(classes.dense, classes.messageForm)}
          margin="dense"
          variant="filled"
          multiline
          rowsMax="4"
          rows={4}
        />
      </Paper>
    </Container>
  );
};

export default ChatPage;
