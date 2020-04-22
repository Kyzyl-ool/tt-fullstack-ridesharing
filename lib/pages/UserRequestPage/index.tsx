import React, { Fragment } from 'react';
import { UserPage } from '../UserPage';
import { Button } from 'components/Button';
import { useParams } from 'react-router-dom';

export const UserRequestPage = () => {
  const { userId, rideId } = useParams();
  return (
    <Fragment>
      <UserPage requestInfo={{ userId, rideId }} />
    </Fragment>
  );
};
