import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearError } from '../store/actions';
import { Alert } from 'antd';
import { RootState } from '../store/store';

const AlertBanner = () => {
  const error: Error = useSelector((state: RootState) => state.errorReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => dispatch(clearError()), 3000);
  }, [error]);

  return (
    error && (
      <Alert
        className="alert-banner"
        message={error.message}
        type="warning"
        showIcon
        onClose={() => dispatch(clearError())}
        closable
      />
    )
  );
};

export default AlertBanner;
