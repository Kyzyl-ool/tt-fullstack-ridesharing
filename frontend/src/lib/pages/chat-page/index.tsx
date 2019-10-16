import React from 'react';
import { makeStyles, Paper } from '@material-ui/core';
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

const useStyles = makeStyles({
  message: {
    margin: '8px',
    backgroundColor: MainColor[50]
  }
});

const ChatPage: React.FC<IChatPageProps> = props => {
  const classes = useStyles(props);

  return (
    <Paper>
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
  );
};

export default ChatPage;
