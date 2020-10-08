import React from 'react';

const SingleMessage = ({
  message,
  user,
  fromSelf,
}: {
  message: string;
  user: string;
  fromSelf: boolean;
}) => (

  <div className="message">
    { fromSelf ? (

      <div className="me">
        {message}
      </div>
    ) : (
      <div className="others">
        {user}
        :
        <div className="other">{message}</div>
      </div>
    )}
  </div>

);

export default SingleMessage;
