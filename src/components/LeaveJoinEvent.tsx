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
        <i className="leave event">

          {`${user} has left the chat`}
        </i>
      );
    case 'user_join':
      return (
        <i className="join event">

          {`${user} has joined the chat`}
        </i>
      );
    case 'timeout':
      return (
        <i className="join event">

          {`${user} was disconnected due to inactivity`}
        </i>
      );
    default:
      return <div />;
  }
};

export default LeaveJoinEvent;
