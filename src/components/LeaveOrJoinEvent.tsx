import React from 'react';
const LeaveOrJoinEvent = ({
  eventType,
  user,
}: {
  eventType: string;
  user: string;
}) => {
  switch (eventType) {
    case 'user_leave':
      return <p className="leave">{user} has left the chat</p>;
    case 'user_join':
      return <p className="join">{user} has joined the chat</p>;
    case 'timeout':
      return <p className="join">{user} was due to inactivity</p>;
    default:
      return <div></div>;
  }
};

export default LeaveOrJoinEvent;
