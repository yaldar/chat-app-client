import { getTime } from '../util';

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
  payload: string[];
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
  type: 'SET_NICKNAME' | 'CLEAR_NICKNAME';
  payload: string;
};
const nicknameReducer = (state = '', { type, payload }: NicknameAction) => {
  switch (type) {
    case 'SET_NICKNAME':
      return payload;
    case 'CLEAR_NICKNAME':
      return '';
    default:
      return state;
  }
};

type EventAction = {
  type: 'NEW_MESSAGE' | 'USER_JOIN' | 'USER_LEAVE' | 'CLEAR_CHAT' | 'TIMEOUT';
  payload: {
    from: string;
    message?: string;
    eventType: 'NEW_MESSAGE' | 'USER_LEAVE';
  };
};
const chatReducer = (state = [], { type, payload }: EventAction) => {
  switch (type) {
    case 'NEW_MESSAGE':
      return [
        ...state,
        {
          from: payload.from,
          message: payload.message,
          timeStamp: getTime(),
          eventType: 'new_message',
        },
      ];
    case 'USER_JOIN':
      return [
        ...state,
        {
          from: payload.from,
          timeStamp: getTime(),
          eventType: 'user_join',
        },
      ];
    case 'USER_LEAVE':
      return [
        ...state,
        {
          from: payload.from,
          timeStamp: getTime(),
          eventType: 'user_leave',
        },
      ];
    case 'TIMEOUT':
      return [
        ...state,
        {
          from: payload.from,
          timeStamp: getTime(),
          eventType: 'timeout',
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
    message: string;
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
