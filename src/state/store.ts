import { applyMiddleware, combineReducers, createStore, compose } from 'redux';
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

store.subscribe(() => console.log(store.getState()));

export default store;
