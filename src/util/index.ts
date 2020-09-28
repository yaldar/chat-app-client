import { Dispatch } from 'redux';
import { clearChat, clearNickname, clearUsers } from '../state/actions';

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

const clearLocalData = (socket: SocketIOClient.Socket, dispatch: Dispatch) => {
  dispatch(clearChat());
  dispatch(clearNickname());
  dispatch(clearUsers());

  if (socket) {
    socket.disconnect();
  }
};

export default { addUser, clearLocalData };
