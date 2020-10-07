import React from 'react';

const SingleMessage = ({
  message,
  user,
  fromSelf,
}: {
  message: string;
  user: string;
  fromSelf: boolean;
}) => {
  return fromSelf ? (
    <div className="me"> {message}</div>
  ) : (
    <div className="">
      {user}
      <div className="other">{message}</div>
    </div>
  );
};

export default SingleMessage;
