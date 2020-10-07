import { Button, Input } from 'antd';
import React, { FormEvent, useState } from 'react';

const ChatInput = ({ socket }: { socket: SocketIOClient.Socket }) => {
  const [messageInput, setMessageInput] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (messageInput) {
      socket.emit('new_message', { id: socket.id, message: messageInput });
    }
    setMessageInput('');
  };

  return (
    <form onSubmit={handleSubmit} className="chat-input">
      <Input
        autoFocus
        type="text"
        value={messageInput}
        onChange={(e) => setMessageInput(e.target.value)}
        className="textField"
      />
      <Button type="ghost" htmlType="submit">
        Send
      </Button>
    </form>
  );
};

export default ChatInput;
