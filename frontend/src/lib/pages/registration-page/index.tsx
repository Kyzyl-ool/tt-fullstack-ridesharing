import React, { useState } from 'react';
import ChatPage from '../chat-page';
import { messagesMockData } from '../../../mocks/messages';
import { Container } from '@material-ui/core';

export const RegistrationPage: React.FC = props => {
  const [messages, setMessages] = useState(messagesMockData.messages);
  const [title, setTitle] = useState(messagesMockData.title);
  const [myId, setMyId] = useState(messagesMockData.myId);
  const [participants, setParticipants] = useState(messagesMockData.participants);

  return (
    <Container>
      <ChatPage messages={messages} title={title} myId={myId} participants={participants} />
    </Container>
  );
};
