import React from 'react';

const SingleMessage = ({
  message,
  user,
  fromSelf,
  time,
}: {
  message: string;
  user: string;
  fromSelf: boolean;
  time: string;
}) => (
  fromSelf ? (
    <div className="me message">
      <div className="tooltiptext me">{time}</div>
      {message}
    </div>
  ) : (
    <div className="others">
      {user}
      :
      <div className="other message">
        <div className="tooltiptext other">{time}</div>
        {message}
      </div>
    </div>
  )
);

export default SingleMessage;
