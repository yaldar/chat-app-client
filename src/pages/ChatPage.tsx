import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { RootState } from '../store/store';
import Messages from '../components/Messages';
import OnlineUsers from '../components/OnlineUsers';
import util from '../util';
import ChatInput from '../components/ChatInput';

const isInDev = () => '_self' in React.createElement('div');
const getUrl = () => (isInDev()
  ? 'http://localhost:8080/'
  : 'https://calm-beyond-82729.herokuapp.com/');

const ChatPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const socket: SocketIOClient.Socket = useSelector(
    (state: RootState) => state.socketReducer,
  );

  useEffect(() => {
    if (!socket) history.push('/');
    util.initializeSocketListeners(socket, dispatch, history, getUrl());
    return () => {
      if (socket) {
        socket.disconnect();
      }
      util.clearLocalData(socket, dispatch);
    };
  }, [socket]);

  return (
    <div className="page">
      <div className="chat-wrapper">
        <Messages />
        <ChatInput socket={socket} />
      </div>
      <OnlineUsers />
    </div>
  );
};

export default ChatPage;
