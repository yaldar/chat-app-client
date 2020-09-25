import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import util from '../util';
import io from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';

import { useHistory } from 'react-router-dom';
import AlertBanner from '../components/AlertBanner';
import { setNewSocket, setUsers } from '../state/actions';
import store from '../state/reducers';

const LandingPage: React.FC = () => {
  const history = useHistory();

  const [nickname, setNickname] = useState('');
  const [alert, setAlert] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {}, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const getUsers = () => async (dispatch: any) => {
    const res = await fetch('http://localhost:8080/api/users');
    const data = await res.json();
    console.log(data);
    dispatch(setUsers(data));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { error, alreadyExists } = await util.addUser(nickname);
    if (error) {
      setAlert(error.message);
    } else if (alreadyExists) {
      setAlert('name taken!');
    } else {
      const newSocket = io('http://localhost:8080');
      console.log(newSocket);
      dispatch(setNewSocket(newSocket));

      dispatch(getUsers());
      history.push('/chat');
    }
  };

  return (
    <div className="chat">
      {alert && <AlertBanner alert={alert} setAlert={setAlert} />}
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={nickname} onChange={handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default LandingPage;
