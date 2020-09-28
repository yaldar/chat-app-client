import { applyMiddleware, combineReducers, createStore } from 'redux';
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
export type RootState = ReturnType<typeof RootReducer>;

const store = createStore(
  RootReducer,
  composeWithDevTools(applyMiddleware(thunkMiddleware)),
);

export default store;
