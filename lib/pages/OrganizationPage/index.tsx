import React, { useEffect, useState } from 'react';
import _isEmpty from 'lodash/isEmpty';
import { useParams, useHistory, Link } from 'react-router-dom';
import dateFormat from 'date-fns/format';
import ruLocale from 'date-fns/locale/ru';
import { Header } from 'components/Header';
import usePageState from 'hooks/usePageState/usePageState';
import { NearestOrganizationLabel } from 'components/NearestOrganizationLabel';
import { Avatar } from 'components/Avatar/Avatar';
import { Backdrop } from 'components/Backdrop';
import { BaseLayer } from 'components/BaseLayer/BaseLayer';
import { OrganizationModel } from 'models/OrganizationModel';
import { UserCard } from 'components/UserCard';
import './OrganizationPage.scss';
import { useHiddenMap } from 'hooks/mapHooks';
import {
  setMapHideAction,
  resetMapHideAction,
  setCenterOnPointAction,
  resetCenterOnPointAction
} from 'store/actions/mapActions';
import { useDispatch } from 'react-redux';
import { CenteredLoader } from 'components/CenteredLoader';
import { parseLocationAddress } from 'helpers/parseLocationAddress';

type OrganizationDataType = {
  address: string;
  creator: {
    id: number;
    photoUrl: string;
  };
  description: string;
  id: number;
  lastRideDatetime: string;
  maxRideCost: string;
  minRideCost: string;
  name: string;
  photoUrl: string;
  totalDrivers: string;
  totalMembers: string;
  latitude: number;
  longitude: number;
};

type OrganizationMemberType = {
  firstName: string;
  id: number;
  lastName: string;
  photoUrl: string;
  rating: number;
};

type OrganizationMembersType = {
  id: number;
  members: OrganizationMemberType[];
};

export const OrganizationPage: React.FC = props => {
  const { organizationId } = useParams();
  const history = useHistory();
  const [organizationData, setOrganizationData] = useState<OrganizationDataType>(null);
  const [organizationMembers, setOrganizationMembers] = useState<OrganizationMembersType>({
    id: 0,
    members: []
  });
  const [pageState, setNext, setPrev, renderForState] = usePageState(['ORGANIZATION', 'MEMBERS']);
  const dispatch = useDispatch();

  useEffect(() => {
    const getData = async () => {
      const getOrganizationResponse = await OrganizationModel.get(organizationId);
      setOrganizationData({
        ...getOrganizationResponse.data
      });
      const getOrganizationParticipants = await OrganizationModel.members(organizationId);
      setOrganizationMembers(getOrganizationParticipants.data);
    };
    getData();
  }, []);

  const handleBack = () => {
    if (pageState === 'ORGANIZATION') {
      history.push('/');
    } else {
      setPrev();
    }
  };
  const handleNext = () => {
    setNext();
  };

  useEffect(() => {
    if (!_isEmpty(organizationData)) {
      const { latitude, longitude } = organizationData;
      dispatch(setCenterOnPointAction({ latitude, longitude }));
    }
    return () => dispatch(resetCenterOnPointAction());
  }, [organizationData]);

  return (
    <>
      {!_isEmpty(organizationData) ? (
        <div>
          <Header iconType={'back'} onIconClick={handleBack}>
            <NearestOrganizationLabel onClick={() => {}} />
          </Header>
          {renderForState(
            'ORGANIZATION',
            <BaseLayer type={'primary'} className={'organization-page__layer'}>
              <div className={'flex-row organization-page__head'}>
                <Link to={`/user/${organizationData.creator.id}`}>
                  <Avatar
                    src={organizationData.creator.photoUrl}
                    size={'small'}
                    subtext={'Создатель'}
                    className={'margin'}
                  />
                </Link>
                <div className={'organization-page__main-info'}>
                  <span className="organization-page__name">{organizationData.name}</span>
                  <span className={'organization-page__address-wrapper'}>
                    <b className={'organization-page__address'}>
                      {parseLocationAddress(organizationData.address).name}
                    </b>
                  </span>
                </div>
              </div>
              <div className={'organization-page__info'}>
                <div className={'organization-page__info-content'}>
                  <div className={'organization-page__last-date'}>
                    <span>Дата последней поездки: &nbsp;</span>
                    <br />
                    <b>
                      {organizationData.lastRideDatetime !== '-'
                        ? dateFormat(new Date(organizationData.lastRideDatetime), 'dd MMM yyyy', {
                            locale: ruLocale
                          })
                        : 'N/A'}
                    </b>
                  </div>
                  <div>
                    Кол-во участников:&nbsp;<b>{organizationData.totalMembers}</b>
                    <br />
                    Водителей:&nbsp;<b>{organizationData.totalDrivers}</b>
                    <br />
                    <br />
                    <u onClick={handleNext} className={'underlined-clickable'}>
                      Просмотреть участников
                    </u>
                  </div>
                </div>
                <br />

                <div>
                  Стоимость поездки:{' '}
                  {organizationData.minRideCost !== '-' && organizationData.maxRideCost !== '-' ? (
                    <b>
                      от {Number(organizationData.minRideCost).toFixed(0)} до{' '}
                      {Number(organizationData.maxRideCost).toFixed(0)} ₽
                    </b>
                  ) : (
                    <b>N/A</b>
                  )}
                </div>
              </div>
            </BaseLayer>,
            'appear'
          )}
          {renderForState(
            'MEMBERS',
            <div className={`organization-page__background`}>
              {organizationMembers.members.map(value => (
                <UserCard
                  key={value.id}
                  avatarSrc={value.photoUrl}
                  mark={value.rating}
                  name={`${value.firstName} ${value.lastName}`}
                />
              ))}
            </div>,
            'appear'
          )}
        </div>
      ) : (
        <CenteredLoader />
      )}
    </>
  );
};
