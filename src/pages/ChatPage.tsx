import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { RootState } from '../store/store';
import Messages from '../components/Messages';
import OnlineUsers from '../components/OnlineUsers';
import {initializeSocketListeners, clearLocalData} from '../util';
import ChatInput from '../components/ChatInput';
import { disconnect } from '../socket';

const isInDev = () => '_self' in React.createElement('div');
const getUrl = () =>
  isInDev()
    ? 'http://localhost:8080/'
    : 'https://calm-beyond-82729.herokuapp.com/';

const ChatPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const socket: SocketIOClient.Socket = useSelector(
    (state: RootState) => state.socketReducer,
  );

  useEffect(() => {
    if (!socket) history.push('/');
    initializeSocketListeners(socket, dispatch, history, getUrl());
    return () => {
      if (socket) {
        disconnect(socket);
      }
      clearLocalData(socket, dispatch);
    };
  }, [socket, dispatch, history]);

  return (
    <div className="chat-page">
      <OnlineUsers />
      <div className="chat">
        <Messages />
        <ChatInput socket={socket} />
      </div>
    </div>
  );
};

export default ChatPage;
