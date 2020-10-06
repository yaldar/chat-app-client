import React, {
  ChangeEvent, FormEvent, useEffect, useState,
} from 'react';
import io from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';

import { useHistory } from 'react-router-dom';

import { setSocket, setError, setNickname } from '../state/actions';
import { RootState } from '../state/store';
import util from '../util';

const LandingPage: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const socket: SocketIOClient.Socket = useSelector(
    (state: RootState) => state?.socketReducer,
  );

  useEffect(() => {}, []);
  const [nicknameInput, setNicknameInput] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNicknameInput(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { alreadyExists, error } = await util.addUser(nicknameInput);
    if (error) {
      dispatch(
        setError(
          `Problem contacting server, please try again later. Error message: ${error.message}`,
        ),
      );
    } else if (alreadyExists) {
      dispatch(setError('Nickname alrready taken!'));
    } else if (!nicknameInput) {
      dispatch(setError('Nickname cannot be empty!'));
    } else {
      try {
        const newSocket = io('http://localhost:8080');
        newSocket.emit('user_join', nicknameInput);
        dispatch(setSocket(newSocket));
        dispatch(setNickname(nicknameInput));
        history.push('/chat');
      } catch (err) {
        dispatch(
          setError(
            `Problem establishing a connection. Error message: ${err?.message}`,
          ),
        );
      }
    }
  };

  return (
    <div className="loginWrapper">
      <h2>Welcome to Ubuiquiti chat!</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          className="nicknameField"
          type="text"
          value={nicknameInput}
          placeholder="Enter your nickname"
          onChange={handleChange}
        />

        <button type="submit">Join chat</button>
      </form>
    </div>
  );
};

export default LandingPage;
