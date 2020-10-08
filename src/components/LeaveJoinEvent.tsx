import React from 'react';

const LeaveJoinEvent = ({
  eventType,
  user,
}: {
  eventType: string;
  user: string;
}) => {
  switch (eventType) {
    case 'user_leave':
      return <i className="leave message">{`${user} has left the chat`}</i>;
    case 'user_join':
      return <i className="join message">{`${user} has joined the chat`}</i>;
    case 'timeout':
      return (
        <i className="join message">{`${user} was disconnected due to inactivity`}</i>
      );
    default:
      return <div />;
  }
};

export default LeaveJoinEvent;
