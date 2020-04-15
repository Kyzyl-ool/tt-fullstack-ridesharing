import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import RideModel from 'models/RideModel';

const IncomingRequestsPage = () => {
  const [requests, setRequests] = useState([]);
  const { rideId } = useParams();
  const history = useHistory();

  const getRequests = async () => {
    await RideModel.getRequests();
  };

  useEffect(() => {
    getRequests();
  }, []);

  return <div>{rideId}</div>;
};

export default IncomingRequestsPage;
