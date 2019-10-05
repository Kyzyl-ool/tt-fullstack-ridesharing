import React from 'react';
import {Avatar, Box, Typography} from "@material-ui/core";
import styles from './index.module.scss';

interface IMessageProps {
  first: boolean
  last: boolean
  avatarSrc?: string
  body: string
  time: string
  author?: {
    name: string
    color: string
  }
  mine: boolean
}

const Message: React.FC<IMessageProps> = (props) => {
  return (
    <Box display={'flex'} flexDirection={`${props.mine ? 'row-reverse' : 'row'}`} alignItems={'flex-end'}>
      <Box style={{margin: '0px 8px 0 8px', opacity: `${props.last ? 1 : 0}`}}>
        <Avatar/>
      </Box>
      <div
        className={`${styles.message} ${props.first ? styles.message__first : styles.message__notfirst} ${props.last ? styles.message__last : styles.message__notlast} ${props.mine ? styles.message__mine : styles.message__notmine}`}>
        <Typography className={`${styles.body} ${props.mine ? styles.body__mine : styles.body__notmine}`} variant={"body1"}>{props.body}</Typography>
        <Typography className={styles.time} variant={"caption"}>{props.time} </Typography>
      </div>
    </Box>
  );
};

export default Message;
