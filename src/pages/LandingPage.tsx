import React, { FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import io from 'socket.io-client';
import { Button, TextField } from '@material-ui/core';
import { setSocket, setError, setNickname } from '../store/actions';
import { invalidNickname, addUser, getServerUrl } from '../util';

const LandingPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [nicknameInput, setNicknameInput] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { alreadyExists, error } = await addUser(nicknameInput, getServerUrl());
    if (error) {
      dispatch(
        setError(`Problem contacting server. Error message: ${error.message}`),
      );
    } else if (invalidNickname(nicknameInput)) {
      dispatch(setError('invalid nickname. only letters and numbers allowed!'));
    } else if (alreadyExists) {
      dispatch(setError('Nickname alrready taken!'));
    } else if (!nicknameInput) {
      dispatch(setError('Nickname cannot be empty!'));
    } else {
      try {
        const newSocket = io(getServerUrl());

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
        <TextField
          onChange={(e) => setNicknameInput(e.target.value)}
          autoFocus
          type="text"
          id="standard-basic"
          label="Nickname"
          className="nickname-field"
          value={nicknameInput}
        />

        <Button
          type="submit"
          className="login-button"
          variant="outlined"
          color="primary"
          disableElevation
          style={{ borderRadius: 25, margin: '20px' }}
        >
          Join chat
        </Button>
      </form>
    </div>
  );
};

export default LandingPage;
