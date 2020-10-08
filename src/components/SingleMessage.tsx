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
    <div data-tip data-for="me" className="me">
      {message}
    </div>
    <ReactTooltip id="me" effect="solid">
      <span>{`sent at: ${time}`}</span>
    </ReactTooltip>
  </>
) : (
  <div className="other-wrapper">
    {user}

    <div data-tip data-for="other" className="other">
      {message}
    </div>
    <ReactTooltip id="other" type="warning" effect="solid">
      <span>{`sent at: ${time}`}</span>
    </ReactTooltip>

  </div>
));

export default SingleMessage;
