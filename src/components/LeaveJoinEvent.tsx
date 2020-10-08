import React from 'react';

const LeaveJoinEvent = ({
  eventType,
  user,
  time,
}: {
  eventType: string;
  user: string;
  time: string
}) => {
  switch (eventType) {
    case 'user_leave':
      return (
        <i className="leave message tooltip">

          {`${user} has left the chat`}
        </i>
      );
    case 'user_join':
      return (
        <i className="join message tooltip">

          {`${user} has joined the chat`}
        </i>
      );
    case 'timeout':
      return (
        <i className="join message tooltip">

          {`${user} was disconnected due to inactivity`}
        </i>
      );
    default:
      return <div />;
  }
};

export default LeaveJoinEvent;
