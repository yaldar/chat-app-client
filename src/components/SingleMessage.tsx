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
    <div className="me" title={`sent at: ${time}`}>{message}</div>
  ) : (
    <div className="other-wrapper">
      {user}
      <div className="other" title={`sent at: ${time}`}>{message}</div>
    </div>
  )
);

export default SingleMessage;
