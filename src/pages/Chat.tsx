import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../state/reducers';

const Chat: React.FC = () => {
  const socket = useSelector((state: RootState) => state?.socket);
  useEffect(() => {
    console.log(socket);
  }, []);
  return <h1>I am the chat page</h1>;
};

export default Chat;
