import React, { Dispatch, SetStateAction } from 'react';

type Props = { alert: String; setAlert: Dispatch<SetStateAction<string>> };

const AlertBanner: React.FC<Props> = ({ alert, setAlert }) => {
  return (
    <div>
      <button onClick={() => setAlert('')}>x</button>
      <h1>{alert}</h1>
    </div>
  );
};

export default AlertBanner;
