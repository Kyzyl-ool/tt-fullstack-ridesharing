import React, { useEffect, useState } from 'react';
import _isEmpty from 'lodash/isEmpty';
import { useParams, useHistory } from 'react-router-dom';
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
    // setRequests(fetchedRequests.filter(request => request.rideId === rideId));
    setRequests([
      {
        rideId,
        user: {
          id: 2,
          firstName: 'John',
          lastName: 'Krasinsky',
          photoUrl: '',
          rating: 9
        }
      },
      {
        rideId,
        user: {
          id: 3,
          firstName: 'Michael',
          lastName: 'Scott',
          photoUrl: '',
          rating: 3
        }
      }
    ]);
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
      {!_isEmpty(requests) && (
        <ul className="incoming-requests-page__requests-list">
          {requests.map(request => (
            <li className="incoming-requests-page__request" key={request.user.id}>
              <div className="incoming-requests-page__avatar">
                <Avatar size="medium" src={sampleAvatarSrc} />
              </div>
              <span className="incoming-requests-page__name">
                {request.user.firstName} {request.user.lastName}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default IncomingRequestsPage;
