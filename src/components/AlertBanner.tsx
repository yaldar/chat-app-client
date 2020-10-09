import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearError } from '../store/actions';
import { RootState } from '../store/store';
import Alert from '@material-ui/lab/Alert';

const AlertBanner = () => {
  const error: Error = useSelector((state: RootState) => state.errorReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => dispatch(clearError()), 3000);
  }, [error, dispatch]);

  return (
    error && (
      <Alert
        className="alert-banner"
        severity="error"
        onClose={() => dispatch(clearError())}
      >
        {error.message}
      </Alert>
    )
  );
};

export default AlertBanner;
