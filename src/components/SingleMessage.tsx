import React, { useEffect } from 'react';

const SingleMessage = ({ message, sender }: { message: any; sender: any }) => {
  console.log(sender);
  return (
    <p className={`message ${sender}`}>
      {sender === 'me'
        ? message
        : sender + '\n' +  message}
    </p>
  );
};

export default SingleMessage;
