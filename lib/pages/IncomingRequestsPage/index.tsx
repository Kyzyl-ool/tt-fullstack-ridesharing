import React, { useEffect, useState, Fragment } from 'react';
import _isEmpty from 'lodash/isEmpty';
import _isEqual from 'lodash/isEqual';
import { useParams, useHistory, Link } from 'react-router-dom';
import RideModel from 'models/RideModel';
import { IRequest } from 'domain/ride';
import './IncomingRequestsPage.scss';
import { Avatar } from 'components/Avatar/Avatar';
import { sampleAvatarSrc } from 'samples/samples';
import { Header } from 'components/Header';
import { NearestOrganizationLabel } from 'components/NearestOrganizationLabel';

const IncomingRequestsPage = () => {
  const [requests, setRequests] = useState<IRequest[]>([]);
  const { rideId } = useParams();
  const history = useHistory();

  const getRequests = async () => {
    const fetchedRequests = await RideModel.getRequests();
    console.log(
      fetchedRequests.filter(request => request.rideId.toString() === rideId),
      rideId,
      fetchedRequests[0].rideId,
      rideId === fetchedRequests[0].rideId.toString(),
      _isEqual(rideId, fetchedRequests[0].rideId)
    );
    setRequests(fetchedRequests.filter(request => request.rideId.toString() === rideId));
  };

  useEffect(() => {
    getRequests();
  }, []);

  const onGoBack = () => history.goBack();

  return (
    <div className="incoming-requests-page__backdrop">
      <Header iconType="back" onIconClick={onGoBack}>
        <NearestOrganizationLabel onClick={() => {}} />
      </Header>
      <div className="incoming-requests-page__header">Входящие запросы</div>
      {!_isEmpty(requests) ? (
        <ul className="incoming-requests-page__requests-list">
          {requests.map(request => (
            <Link key={request.user.id} to={`/ride/${rideId}/requests/${request.user.id}`}>
              <li className="incoming-requests-page__request" key={request.user.id}>
                <div className="incoming-requests-page__avatar">
                  <Avatar size="medium" src={sampleAvatarSrc} />
                </div>
                <span className="incoming-requests-page__name">
                  {request.user.firstName} {request.user.lastName}
                </span>
              </li>
            </Link>
          ))}
        </ul>
      ) : (
        <p className="incoming-requests-page__text">Запросов на присоединение к данной поездке пока нет</p>
      )}
    </div>
  );
};

export default IncomingRequestsPage;
