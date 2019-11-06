import React, { useState } from 'react';
import ChatPage from '../chat-page';
import { Container } from '@material-ui/core';

interface IRegistrationPage {
  onAuth: (any) => any;
}

export const RegistrationPage: React.FC<IRegistrationPage> = props => {
  return <ChatPage onAuth={props.onAuth} />;
};
