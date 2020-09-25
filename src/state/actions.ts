export const setNewSocket = (socket: SocketIOClient.Socket) => ({
  type: 'NEW_SOCKET',
  payload: socket,
});

export const setUser = (user: String) => ({
  type: 'NEW_USER',
  payload: user,
});

export const setUsers = (user: String) => ({
  type: 'USERS',
  payload: user,
});

export const sendMessage = (message: String, user: String) => ({
  type: 'SEND_MESSAGE',
  payload: {
    message,
    user,
  },
});

export const disconnect = () => ({
  type: 'DISCONNECT',
  payload: null,
});



// write async thunk stuff here

// // in an action creator module:
// const simpleLogin = user => ({ type: LOGIN, user })

// // Look, no store import!

// const thunkedLogin = () =>     // action creator, when invoked…
//   dispatch =>                  // …returns thunk; when invoked with `dispatch`…
//     axios.get('/api/auth/me')  // …performs the actual effect.
//     .then(res => res.data)
//     .then(user => {
//       dispatch(simpleLogin(user))
//     })

// // somewhere in component:
// store.dispatch(thunkedLogin())

// const store = createStore(rootReducer, applyMiddleware(thunk));
// this is important
