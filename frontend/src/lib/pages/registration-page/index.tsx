import React from 'react';
import ChatPage from '../chat-page';
import { messagesMockData } from '../../../mocks/messages';

export const RegistrationPage: React.FC = props => {
  return <ChatPage {...messagesMockData} />;
};
