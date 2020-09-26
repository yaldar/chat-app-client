import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearError } from '../state/actions';
import { RootState } from '../state/store';

const AlertBanner: React.FC = () => {
  const error = useSelector((state: RootState) => state?.errorReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log('i run');

    setTimeout(() => dispatch(clearError()), 3000);
  }, [error]);
  return (
    error && (
      <div>
        <button onClick={() => dispatch(clearError())}>canellllll</button>
      </div>
    )
  );
};

export default AlertBanner;
