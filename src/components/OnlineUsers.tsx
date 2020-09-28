import React from 'react';

const OnlineUsers = ({ users }: { users: string[] }) => {
  return (
    <div className="users">
      <h4>Online users:</h4>
      {users.map((u, index) => (
        <p key={index}> 🟢 {u}</p>
      ))}
    </div>
  );
};

export default OnlineUsers;
