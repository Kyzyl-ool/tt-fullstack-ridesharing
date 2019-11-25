import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { Avatar } from '../Avatar/Avatar';
import './Message.scss';

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
  return (
    <Box
      display={'flex'}
      flexDirection={`${props.mine ? 'row-reverse' : 'row'}`}
      alignItems={'flex-end'}
      style={{ height: '45px' }}
    >
      <Box style={{ margin: '0px 8px -20px 8px', opacity: `${props.last ? 1 : 0}` }}>
        <Avatar
          src={!props.mine ? 'https://ridesharing-bucket1.s3.amazonaws.com/31f86839cecd6ea2f661550da2aaa52a' : null}
        />
      </Box>
      <div
        className={`message ${props.first ? 'message__first' : 'message__notfirst'} ${
          props.last ? 'message__last' : 'message__notlast'
        } ${props.mine ? 'message__mine' : 'message__notmine'}
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
