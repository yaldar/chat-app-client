import React, { ChangeEvent, FormEvent, useState } from 'react';
import util from '../util';
import io from 'socket.io-client';
import { useDispatch } from 'react-redux';

import { useHistory } from 'react-router-dom';

import { setSocket, setError, setNickname } from '../state/actions';

const LandingPage: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [nicknameInput, setNicknameInput] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNicknameInput(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { alreadyExists, error } = await util.addUser(nicknameInput);

    if (error) {
      console.log('huh');
    } else if (alreadyExists) {
      dispatch(setError('nickname taken'));
    } else {

      const newSocket = io('http://localhost:8080');
      console.log(io('http://localhost:8080'));
      console.log(newSocket.connected);
      if (newSocket.connected) {
        dispatch(setSocket(newSocket));
        dispatch(setNickname(nicknameInput));
        history.push('/chat');
      } else {
        console.log('what in the fuck');
      }
    }
  };

  return (
    <div className="chat">
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={nicknameInput} onChange={handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default LandingPage;
