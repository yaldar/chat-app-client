import { IconButton, TextField } from '@material-ui/core';
import React, { FormEvent, useState } from 'react';
import SendIcon from '@material-ui/icons/Send';
import {sendMessage} from '../socket'

const ChatInput = ({ socket }: { socket: SocketIOClient.Socket }) => {
  const [messageInput, setMessageInput] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (messageInput) {
      sendMessage(socket, messageInput)
    }
    setMessageInput('');
  };

  return (
    <form onSubmit={handleSubmit} className="chat-form">
      <TextField
        fullWidth
        autoFocus
        onChange={(e) => setMessageInput(e.target.value)}
        type="text"
        className="text-field"
        value={messageInput}
      />

      <IconButton
        type="submit"
        style={{
          right: 0,
          marginRight: 'auto',
          paddingRight: 'auto',
          backgroundColor: 'white',
          opacity: 0.5,
          marginLeft: '10px',
        }}
      >
        <SendIcon />
      </IconButton>
    </form>
  );
};

export default ChatInput;
