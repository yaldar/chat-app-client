import React from 'react';
import ReactTooltip from 'react-tooltip';

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
}) => (fromSelf ? (
  <>
    <p data-tip data-for="me" className="me">
      {message}
    </p>
    <ReactTooltip id="me" effect="solid">
      <span>{`sent at: ${time}`}</span>
    </ReactTooltip>
  </>
) : (
  <div className="other-wrapper">
    {user}

    <p data-tip data-for="other" className="other">
      {message}
    </p>
    <ReactTooltip id="other" effect="solid">
      <span>{`sent at: ${time}`}</span>
    </ReactTooltip>

  </div>
));

export default SingleMessage;
