/* eslint-disable no-undef */
/* eslint-disable max-len */
import { Dispatch } from 'react';
import {
  clearChat,
  clearNickname,
  clearUsers,
  fetchUsers,
  newMessage,
  setError,
  userJoin,
  userLeave,
  userTimeout,
} from '../store/actions';

const addUser = async (nickname: string, serverUrl: string) => {
  const obj: {
    error: Error | undefined;
    alreadyExists: boolean | undefined;
  } = {
    error: undefined,
    alreadyExists: undefined,
  };

  try {
    const data = await fetch(`${serverUrl}${nickname}`);
    if (data.status === 200) {
      obj.error = undefined;
      obj.alreadyExists = false;
    } else if (data.status === 409) {
      obj.alreadyExists = true;
    } else if (data.status === 404) {
      obj.error = undefined;
      obj.alreadyExists = false;
    }
  } catch (e) {
    console.log('object');
    obj.error = e;
    obj.alreadyExists = undefined;
  }
  return obj;
};

const clearLocalData = (
  socket: SocketIOClient.Socket,
  dispatch: Dispatch<any>,
) => {
  dispatch(clearChat());
  dispatch(clearNickname());
  dispatch(clearUsers());

  if (socket) {
    socket.disconnect();
  }
};

const initializeSocketListeners = (
  socket: SocketIOClient.Socket,
  dispatch: Dispatch<any>,
  history: any,
  serverUrl: string,
) => {
  if (socket) {
    dispatch(fetchUsers(serverUrl));
    socket.on('new_message', (data: any) => {
      dispatch(newMessage(data.nickname, data.message));
    });
    socket.on('user_join', (nickname: string) => {
      dispatch(userJoin(nickname));
      dispatch(fetchUsers(serverUrl));
    });
    socket.on('server_shutdown', () => {
      dispatch(setError('Server shutting down!'));
      clearLocalData(socket, dispatch);
      history.push('/');
    });
    socket.on('inactivity_disconnect', () => {
      dispatch(setError('you have been disconnected due to inactivity'));
      clearLocalData(socket, dispatch);
      history.push('/');
    });
    socket.on('timeout', (nickname: string) => {
      dispatch(userTimeout(nickname));
    });
    socket.on('user_leave', (nickname: string) => {
      dispatch(userLeave(nickname));
      dispatch(fetchUsers(serverUrl));
    });
    socket.on('disconnect', () => {
      history.push('/');
    });
  } else {
    history.push('/');
  }
};

const invalidNickname = (nickname: string) => {
  const valid = nickname.length < 20 && /^[0-9a-zA-Z ]*$/.test(nickname);
  return !valid;
};

const getTime = () => {
  const today = new Date();
  const date = `${today.getHours()}:${today.getMinutes()}`;
  return date;
};

const getServerUrl = () => {
  return process.env.NODE_ENV === 'development'
    ? 'http://localhost:8080/'
    : 'https://calm-beyond-82729.herokuapp.com/';
};

export {
  addUser,
  clearLocalData,
  invalidNickname,
  initializeSocketListeners,
  getTime,
  getServerUrl,
};
