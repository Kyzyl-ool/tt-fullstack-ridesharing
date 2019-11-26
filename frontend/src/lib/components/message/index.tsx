import React, { useContext, useEffect, useState } from 'react';
import { Box, Typography } from '@material-ui/core';
import { Avatar } from '../Avatar/Avatar';
import './Message.scss';
import { Flag } from '../../pages/chat-page';

interface IMessageProps {
  first: boolean;
  last: boolean;
  avatarSrc?: string;
  body: string;
  time: string;
  author?: {
    name: string;
    color: string;
  };
  mine: boolean;
}

const Message: React.FC<IMessageProps> = props => {
  const [renderNumber, setRenderNumber] = useState(0);
  const flag = useContext(Flag);
  useEffect(() => {
    console.log(`${flag}, from: ${props.body}`);
    setRenderNumber(renderNumber + 1);
  }, [flag]);

  // setRenderNumber(renderNumber+1);
  // if (!props.last) {
  //   setFlag(false)
  // }
  // if (!flag && !props.last) {
  //   setFlag(true)
  // }

  return (
    <Box
      className={['go-up-animation', 'go-up-animation_1'][renderNumber % 2]}
      display={'flex'}
      flexDirection={`${props.mine ? 'row-reverse' : 'row'}`}
      alignItems={'flex-end'}
      mt={0.2}
    >
      <Box className={'avatar-box'} style={{ opacity: `${props.last ? 1 : 0}` }}>
        <Avatar
          src={!props.mine ? 'https://ridesharing-bucket1.s3.amazonaws.com/31f86839cecd6ea2f661550da2aaa52a' : null}
        />
      </Box>
      <div
        className={`message ${props.first ? 'message__first' : 'message__notfirst'} ${
          props.last ? 'message__last' : 'message__notlast'
        } ${props.last ? (!props.mine ? 'appear-left-animation' : 'appear-right-animation') : ''} ${
          props.mine ? 'message__mine' : 'message__notmine'
        }
        ${props.body === 'Пароль скрыт' ? 'message__password' : null}
        `}
      >
        <Typography className={`body ${props.mine ? 'body__mine' : 'body__notmine'}`} variant={'body1'}>
          {props.body}
        </Typography>
        <Typography className="time" variant={'caption'}>
          {props.time}{' '}
        </Typography>
      </div>
    </Box>
  );
};

export default Message;
