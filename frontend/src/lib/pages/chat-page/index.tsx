import React, { useReducer, useState } from 'react';
import clsx from 'clsx';
import { Button, Container, createStyles, makeStyles, Paper, TextField, Theme } from '@material-ui/core';
import { MainColor } from '../../themes/MainColor';
import Message from '../../components/message';
import { messagesMockData } from '../../../mocks/messages';
import { messagesReducer } from '../../store/reducers/messagesReducer';
import { useHistory } from 'react-router-dom';

interface IMessage {
  from: number;
  time: string;
  message: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    chat: {
      paddingBottom: '24vh',
      minHeight: '100vh'
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
      }
      // margin: theme.spacing(2)
    },
    messageFormContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      // margin: theme.spacing(2),
      padding: theme.spacing(2),
      maxHeight: '20vh',
      position: 'fixed',
      bottom: 0,
      left: 0,
      width: '100%',
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: theme.palette.divider
    },
    sendButton: {
      height: '50%'
    }
  })
);

const ChatPage = ({ ...props }) => {
  const classes = useStyles(props);
  const [messages, dispatch] = useReducer(messagesReducer, messagesMockData.messages);
  // const [title, setTitle] = useState(messagesMockData.title);
  const [myId, setMyId] = useState(messagesMockData.myId);
  // const [participants, setParticipants] = useState(messagesMockData.participants);
  const [text, setText] = useState('');
  const [formEnable, setFormEnable] = useState(false);
  const [plotIndex, setPlotIndex] = useState(0);
  const history = useHistory();

  const submitHandler = () => {
    if (text) {
      dispatch({ type: 'new', payload: { time: new Date().toLocaleTimeString(), from: myId, message: text } });
      setText('');
      dispatch({
        type: 'next'
      });
      setPlotIndex(plotIndex + 1);
    }
  };
  const tapHandler = () => {
    switch (plotIndex) {
      case 2:
      case 3:
      case 4:
      case 5: {
        !formEnable && setFormEnable(true);
        break;
      }
      case 6: {
        history.push('/organizations');
        break;
      }
      default: {
        dispatch({
          type: 'next'
        });
        setPlotIndex(plotIndex + 1);
      }
    }
  };

  return (
    <Container>
      <Paper className={classes.chat} onClick={tapHandler}>
        {messages
          .reduce((previousValue, currentValue, currentIndex, array) => {
            const newValue = previousValue;
            newValue.push({
              lastSenderId: array[currentIndex].from,
              component: (
                <Message
                  key={currentIndex}
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
                  mine={array[currentIndex].from === myId}
                />
              )
            });
            return newValue;
          }, [])
          .map(value => value.component)}
      </Paper>
      {formEnable && (
        <Paper className={classes.messageFormContainer}>
          <TextField
            label="Введите сообщение..."
            className={clsx(classes.dense, classes.messageForm)}
            variant="filled"
            multiline
            rowsMax="4"
            rows={4}
            value={text}
            onChange={e => setText(e.target.value)}
          />
          <Button className={classes.sendButton} onClick={submitHandler}>
            Отправить
          </Button>
        </Paper>
      )}
    </Container>
  );
};

export default ChatPage;
