/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react';
import { useSelector } from 'react-redux';
import { Divider } from '@material-ui/core';
import { RootState } from '../store/store';

const OnlineUsers = () => {
  const users: string[] = useSelector((state: RootState) => state.usersReducer);

  return (
    <div className="users">
      <h4>Online users:</h4>
      <Divider  />
      {users.map((user) => (
        <div key={user} className="user">
          {`🟢 ${user}`}
        </div>
      ))}
    </div>
  );
};

export default OnlineUsers;
