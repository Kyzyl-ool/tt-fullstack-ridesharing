import React, { useReducer, useState } from 'react';
import clsx from 'clsx';
import { Button, Container, createStyles, Drawer, makeStyles, Paper, TextField, Theme } from '@material-ui/core';
import { MainColor } from '../../themes/MainColor';
import Message from '../../components/message';
import { messagesMockData } from '../../../mocks/messages';
import { messagesReducer } from '../../store/reducers/messagesReducer';
import { useHistory } from 'react-router-dom';
import MuiPhoneNumber from 'material-ui-phone-number';
import userModel from '../../models/userModel';
import { checkAuth } from '../../../net/auth/auth';

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
      justifyContent: 'space-around',
      alignItems: 'center',
      // margin: theme.spacing(2),
      padding: theme.spacing(2)
      // maxHeight: '20vh',
      // position: 'fixed',
      // bottom: 0,
      // left: 0,
      // width: '100%',
      // borderWidth: '1px',
      // borderStyle: 'solid',
      // borderColor: theme.palette.divider
    },
    sendButton: {
      height: '50%'
    },
    input: {
      color: 'white'
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
  const [driverPlotIndex, setDriverPlotIndex] = useState(0);
  const history = useHistory();
  const [name, setName] = useState(''); //user name
  const [phoneNumer, setPhoneNumer] = useState(''); // user phone number
  const [password, setPassword] = useState(''); // user password
  const [isDriver, setIsDriver] = useState(undefined); // user is driver
  const [email, setEmail] = useState(''); // user email
  const [file, setFile] = useState(undefined);

  const fileHandler = () => {
    if (file) {
      console.log(file);
    }
  };
  const submitHandler = arg => {
    if (text) {
      plotIndex !== 5 && // special for password
        dispatch({
          type: 'new',
          payload: { time: new Date().toLocaleTimeString(), from: myId, message: text }
        });
      dispatch({
        type: 'next'
      });

      setText('');
      setPlotIndex(plotIndex + 1);
    }

    switch (plotIndex) {
      case 2: {
        setName(text);
        break;
      }
      case 3: {
        setEmail(text);
        break;
      }
      case 4: {
        setPhoneNumer(text);
        break;
      }
      case 5: {
        setPassword(text);
        break;
      }
      case 6: {
        setIsDriver(arg);
        dispatch({
          type: arg ? 'next_driver' : 'next'
        });
        setFormEnable(false);
        break;
      }
      default:
        console.log(plotIndex);
        break;
    }
  };
  const onFileLoad = (e, file) => console.log(e.target.result, file.name);
  const tapHandler = () => {
    if (isDriver) {
      switch (driverPlotIndex) {
        case 1: {
          setFormEnable(true);
          break;
        }
        default: {
          dispatch({
            type: 'next_driver'
          });
          setDriverPlotIndex(driverPlotIndex + 1);
        }
      }
    } else {
      switch (plotIndex) {
        case 2:
        case 3:
        case 4:
        case 5: {
          !formEnable && setFormEnable(true);
          break;
        }
        case 6: {
          userModel
            .registerUser({
              firstName: name,
              lastName: name,
              email: email,
              password: password
            })
            .then(value => {
              console.log(value);
              if (typeof value.user_id === 'number') {
                userModel
                  .authorize({
                    login: email,
                    password: password
                  })
                  .then(async value1 => {
                    if (await checkAuth()) {
                      props.onAuth();
                      history.push('/main');
                    }
                  });
              }
            });
          break;
        }
        default: {
          dispatch({
            type: 'next'
          });
          setPlotIndex(plotIndex + 1);
        }
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
      <Drawer open={formEnable} anchor={'bottom'} variant={'persistent'}>
        <Paper className={classes.messageFormContainer}>
          {isDriver && (
            <>
              {driverPlotIndex === 1 && (
                <>
                  <form>
                    <label htmlFor={'file-upload'}>
                      <Button>Выбрать файл</Button>
                    </label>
                    <input
                      hidden
                      id={'file-upload'}
                      type={'file'}
                      className={clsx(classes.input)}
                      onChange={event => setFile(event.target.files[0])}
                    />
                    <label htmlFor={'file-upload-camera'}>
                      <Button>Сфотографировать</Button>
                    </label>
                    <input
                      hidden
                      id={'file-upload-camera'}
                      type={'file'}
                      className={classes.input}
                      accept="image/*"
                      capture={'camera'}
                    />
                    <Button onClick={fileHandler}>Отправить</Button>
                  </form>
                </>
              )}
            </>
          )}
          {!isDriver && (
            <>
              {plotIndex === 6 && (
                <>
                  <Button onClick={() => submitHandler(true)}>Да</Button>
                  <Button onClick={() => submitHandler(false)}>Нет</Button>
                </>
              )}
              {plotIndex === 5 && (
                <TextField
                  label="Придумайте пароль..."
                  className={clsx(classes.messageForm)}
                  variant="filled"
                  // multiline
                  rowsMax="2"
                  rows={1}
                  value={text}
                  onChange={e => setText(e.target.value)}
                  type={'password'}
                />
              )}
              {plotIndex === 4 && (
                <MuiPhoneNumber
                  defaultCountry={'ru'}
                  disableDropdown
                  className={clsx(classes.messageForm)}
                  value={text}
                  onChange={e => setText(e)}
                />
              )}
              {plotIndex === 3 && (
                <TextField
                  label="Ваш email..."
                  className={clsx(classes.messageForm)}
                  variant="filled"
                  // multiline
                  rowsMax="2"
                  rows={1}
                  value={text}
                  onChange={e => setText(e.target.value)}
                />
              )}
              {plotIndex === 2 && (
                <TextField
                  label="Введите ваше имя..."
                  className={clsx(classes.messageForm)}
                  variant="filled"
                  // multiline
                  rowsMax="2"
                  rows={1}
                  value={text}
                  onChange={e => setText(e.target.value)}
                />
              )}
            </>
          )}

          {[2, 3, 4, 5].includes(plotIndex) && (
            <Button className={classes.sendButton} onClick={submitHandler}>
              Отправить
            </Button>
          )}
        </Paper>
      </Drawer>
    </Container>
  );
};

export default ChatPage;
