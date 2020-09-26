import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import OnlineUsers from '../components/OnlineUsers';
import { fetchUsers, newMessage } from '../state/actions';
import { RootState } from '../state/store';

const Chat: React.FC = () => {
  const dispatch = useDispatch();
  const [message, setMessageInput] = useState('');
  const history = useHistory();
  const users: String[] = useSelector(
    (state: RootState) => state?.usersReducer,
  );
  const socket: SocketIOClient.Socket = useSelector(
    (state: RootState) => state?.socketReducer,
  );
  const nickname: String = useSelector(
    (state: RootState) => state?.nicknameReducer,
  );
  const chat: any[] = useSelector((state: RootState) => state?.chatReducer);

  useEffect(() => {
    if (!socket) {
      history.push('/');
    } else {
      dispatch(fetchUsers());
      socket.on('message', (data: any) => {
        dispatch(newMessage(data.nickname, data.message));
      });
      socket.on('new_user', (_data: any) => {
        dispatch(fetchUsers());
      });
    }
  }, [socket]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    socket.emit('message', { nickname, message });
    dispatch(newMessage(nickname, message));
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessageInput(e.target.value);
  };

  const logChat = () => {
    console.log(users);
    console.log(chat);
  };

  const messages = () => {
    return (
      <ul>
        {chat.map((c) => (
          <li>
            <h4>{c.from}</h4>
            <p>{c.message}</p>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div>
      <OnlineUsers users={users} />
      <h1>I am the chat page</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Chatbox
          <input type="text" value={message} onChange={handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
      <button onClick={logChat}>log chat</button>
      {messages()}
    </div>
  );
};

export default Chat;
