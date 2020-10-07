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
import { useDispatch } from 'react-redux';
import { Dispatch } from 'react';

const addUser = async (nickname: string) => {
  const obj: {
    error: Error | undefined;
    alreadyExists: boolean | undefined;
  } = {
    error: undefined,
    alreadyExists: undefined,
  };

  try {
    const data = await fetch(`http://localhost:8080/api/users/${nickname}`);
    if (data.status === 200) {
      obj.error = undefined;
      obj.alreadyExists = false;
    } else if (data.status === 409) {
      obj.alreadyExists = true;
    }
  } catch (e) {
    obj.error = e;
    obj.alreadyExists = undefined;
  }
  return obj;
};

const clearLocalData = (socket: SocketIOClient.Socket, dispatch: Dispatch<any>) => {
  dispatch(clearChat());
  dispatch(clearNickname());
  dispatch(clearUsers());

  if (socket) {
    socket.disconnect();
  }
};

const initializeSocketListeners = (socket: SocketIOClient.Socket, dispatch: Dispatch<any>, history: any) => {


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
      dispatch(fetchUsers());
    });
    socket.on('disconnect', () => {
      history.push('/');
    });
  } else {
    history.push('/');
  }
};

const invalidNickname = (nickname: string) => {
  const valid = /^[0-9a-zA-Z ]*$/.test(nickname);
  return !valid;
};

export default {
  addUser,
  clearLocalData,
  invalidNickname,
  initializeSocketListeners,
};
