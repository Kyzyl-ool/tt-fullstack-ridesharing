import React from 'react';
import { Avatar, Box, Typography } from '@material-ui/core';
import { MyAvatar } from '../Avatar/Avatar';
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
    <Box display={'flex'} flexDirection={`${props.mine ? 'row-reverse' : 'row'}`} alignItems={'flex-end'}>
      <Box style={{ margin: '0px 8px 0 8px', opacity: `${props.last ? 1 : 0}` }}>
        <Avatar src={'https://material-ui.com/static/images/avatar/1.jpg'} />
      </Box>
      <div
        className={`message ${props.first ? 'message__first' : 'message__notfirst'} ${
          props.last ? 'message__last' : 'message__notlast'
        } ${props.mine ? 'message__mine' : 'message__notmine'}`}
      >
        <Typography className={`'body' ${props.mine ? 'body__mine' : 'body__notmine'}`} variant={'body1'}>
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
