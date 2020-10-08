import React, { FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import io from 'socket.io-client';
import { Button, Input } from 'antd';
import { setSocket, setError, setNickname } from '../store/actions';
import util from '../util';

const isInDev = () => '_self' in React.createElement('div');
const getUrl = () => (isInDev() ? 'http://localhost:8080/' : 'https://agile-garden-69002.herokuapp.com/');
const LandingPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [nicknameInput, setNicknameInput] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { alreadyExists, error } = await util.addUser(nicknameInput, getUrl());
    if (error) {
      dispatch(
        setError(`Problem contacting server. Error message: ${error.message}`),
      );
    } else if (util.invalidNickname(nicknameInput)) {
      dispatch(setError('invalid nickname. only letters and numbers allowed!'));
    } else if (alreadyExists) {
      dispatch(setError('Nickname alrready taken!'));
    } else if (!nicknameInput) {
      dispatch(setError('Nickname cannot be empty!'));
    } else {
      try {
        const newSocket = io(getUrl());

        newSocket.emit('user_join', nicknameInput);
        dispatch(setSocket(newSocket));
        dispatch(setNickname(nicknameInput));
        history.push('/chat');
      } catch (err) {
        dispatch(
          setError(
            `Problem establishing a connection. Error message: ${err.message}`,
          ),
        );
      }
    }
  };

  return (
    <div className="login-wrapper">
      <h2 className="welcome">Welcome to Ubiquiti chat!</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <Input
          className="nickname-field"
          type="text"
          value={nicknameInput}
          placeholder="Enter your nickname"
          onChange={(e) => setNicknameInput(e.target.value)}
        />
        <Button type="ghost" htmlType="submit" className="login-button">
          Join chat
        </Button>
      </form>
    </div>
  );
};

export default LandingPage;
