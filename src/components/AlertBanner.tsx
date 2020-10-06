import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearError } from '../state/actions';
import { RootState } from '../state/store';

const AlertBanner: React.FC = () => {
  const error:Error = useSelector((state: RootState) => state?.errorReducer);
  const dispatch = useDispatch();

  const closeError = () => {
    dispatch(clearError());
  };

  useEffect(() => {
    setTimeout(() => dispatch(clearError()), 3000);
  }, [error]);
  return (
    error && (
      <div className="alert-banner">
        <div className="alert">
          <span className="closebtn" onClick={closeError}>
          </span>
          {error.message}
        </div>
      </div>
    )
  );
};

export default AlertBanner;
