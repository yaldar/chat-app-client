import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearError } from '../state/actions';
import { RootState } from '../state/store';
import { Icon, Label } from 'semantic-ui-react';
import { Alert } from 'antd';


const AlertBanner: React.FC = () => {
  const error: Error = useSelector((state: RootState) => state?.errorReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => dispatch(clearError()), 300000);
  }, [error]);
  return (
    error && (
      <div id="alert-banner">
        <Alert
          message=""
          description={error.message}
          type="warning"
          showIcon
          onClose={() => dispatch(clearError())}
          closable
        />
      </div>
    )
  );
};

export default AlertBanner;
