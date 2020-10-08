import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { RootState } from '../store/store';
import Messages from '../components/Messages';
import OnlineUsers from '../components/OnlineUsers';
import util from '../util';
import ChatInput from '../components/ChatInput';

const ChatPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const socket: SocketIOClient.Socket = useSelector(
    (state: RootState) => state.socketReducer,
  );

  useEffect(() => {
    util.initializeSocketListeners(socket, dispatch, history);
    return () => {
      if (socket) {
        socket.disconnect();
      }
      util.clearLocalData(socket, dispatch);
    };
  }, [socket]);

  return (
    <div className="page">
      <OnlineUsers />
      <div className="chat-wrapper">
        <Messages />
        <ChatInput socket={socket} />
      </div>
    </div>
  );
};

export default ChatPage;
