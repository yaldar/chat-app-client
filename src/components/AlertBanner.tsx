import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearError } from '../state/actions';
import { RootState } from '../state/store';
import { Icon, Label } from 'semantic-ui-react';

{
  /* <Label image>
      <img src='/images/avatar/small/ade.jpg' />
      Adrienne
      <Icon name='delete' />
    </Label> */
}

const AlertBanner: React.FC = () => {
  const error: Error = useSelector((state: RootState) => state?.errorReducer);
  const dispatch = useDispatch();

  const closeError = () => {
    dispatch(clearError());
  };

  useEffect(() => {
    const x = document.querySelector('.delete');
    if (x)
      x.addEventListener('click', () => {
        dispatch(clearError());
      });

    setTimeout(() => dispatch(clearError()), 300000);
  }, [error]);
  return (
    error && (
      <div className="alert-box">
      <Label>
        {error.message}
        <Icon name="delete" />
      </Label>
      </div>
    )
  );
};

export default AlertBanner;
