import React from 'react';

const OnlineUsers = ({ users }: { users: String[] }) => {
  return (
    <ul>
      {users.map((u) => (
        <li>{u}</li>
      ))}
    </ul>
  );
};

export default OnlineUsers;
