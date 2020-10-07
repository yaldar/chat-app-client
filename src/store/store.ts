import { applyMiddleware, CombinedState, combineReducers, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import {
  errorReducer,
  nicknameReducer,
  socketReducer,
  usersReducer,
  chatReducer,
} from './reducers';

const RootReducer = combineReducers({
  errorReducer,
  nicknameReducer,
  socketReducer,
  usersReducer,
  chatReducer,
});
export type RootState = CombinedState<{
  errorReducer: never;
  nicknameReducer: string;
  socketReducer: never;
  usersReducer: never;
  chatReducer: never;
}>;

const store = createStore(
  RootReducer,
  composeWithDevTools(applyMiddleware(thunkMiddleware)),
);

export default store;
