import { applyMiddleware, combineReducers, createStore, Reducer } from 'redux';
import thunkMiddleware from 'redux-thunk';

import { setUser } from '../actions';

type ReducerArgs = [
  SocketIOClient.Socket | undefined,
  {
    type: String;
    payload: SocketIOClient.Socket;
  },
];

const socket = (state = null, action: any): SocketIOClient.Socket | null => {
  switch (action.type) {
    case 'NEW_SOCKET':
      return action.payload;
    case 'DISCONNECT':
      return null;
    default:
      return state;
  }
};

const users = (state = null, action: any): SocketIOClient.Socket | null => {
  switch (action.type) {
    case 'USERS':
      return action.payload;
    case 'DISCONNECT':
      return null;
    default:
      return state;
  }
};



const RootReducer = combineReducers({ socket, users });
export type RootState = ReturnType<typeof RootReducer>;

const store = createStore(RootReducer, applyMiddleware(thunkMiddleware));

store.subscribe(()=>console.log(store.getState()))

export default store;
