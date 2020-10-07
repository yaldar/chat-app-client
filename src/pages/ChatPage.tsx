import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import Messages from '../components/Messages';
import OnlineUsers from '../components/OnlineUsers';
import util from '../util';
import ChatInput from '../components/ChatInput';
import { useHistory } from 'react-router-dom';

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
    <div className="chat-wrapper">
      <div>
        <Messages />
        <ChatInput socket={socket} />
        <OnlineUsers />
      </div>
    </div>
  );
};

export default ChatPage;
