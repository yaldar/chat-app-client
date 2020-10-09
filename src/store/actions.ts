import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from './store';

type ThunkType<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const setError = (message: string, code?: number) => ({
  type: 'SET_ERROR',
  payload: { message, code },
});
export const clearError = () => ({
  type: 'CLEAR_ERROR',
});

export const setSocket = (socket: SocketIOClient.Socket) => ({
  type: 'NEW_SOCKET',
  payload: socket,
});

export const setNickname = (user: string) => ({
  type: 'SET_NICKNAME',
  payload: user,
});

export const clearNickname = () => ({
  type: 'CLEAR_NICKNAME',
});

const getUsers = (users: string[]) => ({
  type: 'GET_USERS',
  payload: users,
});
// eslint-disable-next-line consistent-return
export const fetchUsers = (serverUrl: string): ThunkType => async (dispatch) => {
  try {
    const res = await fetch(`${serverUrl}api/users/`);
    const statusCode = res.status;
    if (statusCode === 200) {
      const usersArray = await res.json();

      return dispatch(getUsers(usersArray));
    }
    dispatch(setError(res.statusText));
  } catch (e) {
    dispatch(setError(e.message));
  }
};

export const disconnect = () => ({
  type: 'DISCONNECT',
  payload: null,
});

export const clearUsers = () => ({
  type: 'CLEAR_USERS',
});

export const newMessage = (nickname: string, message: string) => ({
  type: 'NEW_MESSAGE',
  payload: {
    from: nickname,
    message,
  },
});

export const userJoin = (nickname: string) => ({
  type: 'USER_JOIN',
  payload: {
    from: nickname,
  },
});
export const userLeave = (nickname: string) => ({
  type: 'USER_LEAVE',
  payload: {
    from: nickname,
  },
});

export const clearChat = () => ({
  type: 'CLEAR_CHAT',
});

export const userTimeout = (nickname: string) => ({
  type: 'TIME_OUT',
  payload: {
    from: nickname,
  },
});
