import { type } from 'os';

type SocketAction = {
  type: 'NEW_SOCKET' | 'DISCONNECT';
  payload: SocketIOClient.Socket;
};
const socketReducer = (
  state = null,
  { type, payload }: SocketAction,
): SocketIOClient.Socket | null => {
  switch (type) {
    case 'NEW_SOCKET':
      return payload;
    case 'DISCONNECT':
      return null;
    default:
      return state;
  }
};

type UsersAction = {
  type: 'GET_USERS' | 'CLEAR_USERS';
  payload: String[];
};
const usersReducer = (state = [], { type, payload }: UsersAction) => {
  switch (type) {
    case 'GET_USERS':
      return payload;
    case 'CLEAR_USERS':
      return [];
    default:
      return state;
  }
};

type NicknameAction = {
  type: 'NEW_USER' | 'CLEAR_NICKNAME';
  payload: String;
};
const nicknameReducer = (state = '', { type, payload }: NicknameAction) => {
  switch (type) {
    case 'NEW_USER':
      return payload;
    case 'CLEAR_NICKNAME':
      return '';
    default:
      return state;
  }
};

type ChatAction = {
  type: 'NEW_MESSAGE' | 'CLEAR_CHAT';
  payload: {
    from: String;
    message: String;
  };
};
const chatReducer = (state = [], { type, payload }: ChatAction) => {
  switch (type) {
    case 'NEW_MESSAGE':
      return [
        ...state,
        {
          from: payload.from,
          message: payload.message,
          timeStamp: Date.now(),
        },
      ];
    case 'CLEAR_CHAT':
      return [];
    default:
      return state;
  }
};

type ErrorAction = {
  type: 'SET_ERROR' | 'CLEAR_ERROR';
  payload: {
    message: String;
    code?: number;
  };
};
const errorReducer = (state = '', { type, payload }: ErrorAction) => {
  switch (type) {
    case 'SET_ERROR':
      return payload;
    case 'CLEAR_ERROR':
      return '';
    default:
      return state;
  }
};
export {
  socketReducer,
  usersReducer,
  nicknameReducer,
  errorReducer,
  chatReducer,
};
