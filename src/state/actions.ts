import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from './store';

type ThunkType<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const setError = (message: String, code?: number) => ({
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

export const setNickname = (user: String) => ({
  type: 'NEW_USER',
  payload: user,
});

const getUsers = (users: String[]) => ({
  type: 'GET_USERS',
  payload: users,
});
export const fetchUsers = (): ThunkType => async (dispatch) => {
      console.log('here');

  try {
    const res = await fetch('http://localhost:8080/api/users');
    const statusCode = res.status;
    if (statusCode === 200) {
      const usersArray = await res.json();
      dispatch(getUsers(usersArray));
      return dispatch(getUsers(usersArray));
    } else {
      dispatch(setError('jhkkjhlkjhlk'));
    }
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

export const newMessage = (nickname: String, message: String) => ({
  type: 'NEW_MESSAGE',
  payload: {
    from: nickname,
    message,
  },
});

export const clearChat = () => ({
  type: 'CLEAR_CHAT',
});

// const thunkedLogin = () =>     // action creator, when invoked…
//   dispatch =>                  // …returns thunk; when invoked with `dispatch`…
//     axios.get('/api/auth/me')  // …performs the actual effect.
//     .then(res => res.data)
//     .then(user => {
//       dispatch(simpleLogin(user))
//     })
