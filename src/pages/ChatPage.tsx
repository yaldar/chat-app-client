/* eslint-disable import/extensions */
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Messages from '../components/Messages';
import OnlineUsers from '../components/OnlineUsers';
import {
  fetchUsers,
  userJoin,
  newMessage,
  setError,
  userLeave,
 userTimeout
} from '../state/actions';
import { RootState } from '../state/store';
import util from '../util';

// Input placeholder="Basic usage" />
const ChatPage: React.FC = () => {
  const dispatch = useDispatch();
  const [messageInput, setMessageInput] = useState('');
  const history = useHistory();

  const users: string[] = useSelector((state: RootState) => state.usersReducer);
  const socket: SocketIOClient.Socket = useSelector(
    (state: RootState) => state.socketReducer,
  );

  useEffect(() => {
    if (socket) {
      dispatch(fetchUsers());
      socket.on('new_message', (data: any) => {
        dispatch(newMessage(data.nickname, data.message));
      });
      socket.on('user_join', (nickname: string) => {
        dispatch(userJoin(nickname));
        dispatch(fetchUsers());
      });
      socket.on('server_shutdown', () => {
        dispatch(setError('Server shutting down!'));
        util.clearLocalData(socket, dispatch);
        history.push('/');
      });
      socket.on('inactivity_disconnect', () => {
        dispatch(setError('you have been disconnected due to inactivity'));
        util.clearLocalData(socket, dispatch);
        history.push('/');
      });
      socket.on('timeout', (nickname: string) => {
        dispatch(userTimeout(nickname))
      })
      socket.on('user_leave', (nickname: string) => {
        dispatch(userLeave(nickname));
        dispatch(fetchUsers());
      });
      socket.on('disconnect', () => {
        history.push('/');
      });
    } else {
      history.push('/');
    }
    return () => {
      if (socket) {
        socket.disconnect();
      }
      util.clearLocalData(socket, dispatch);
    };
  }, [socket]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (messageInput) {
      socket.emit('new_message', { id: socket.id, message: messageInput });
    }
    setMessageInput('');
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessageInput(e.target.value);
  };

  return (
    <div className="chat">
      <OnlineUsers users={users} />
      <div className="chatWrapper">
        <Messages />
        <form onSubmit={handleSubmit} className="chatInput">
          <input
            autoFocus
            type="text"
            value={messageInput}
            onChange={handleChange}
            className="textField"
          />
          <input type="submit" value="Send" />
        </form>
      </div>
    </div>
  );
};

export default ChatPage;
