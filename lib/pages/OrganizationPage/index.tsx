import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Header } from 'components/Header';
import usePageState from '../../hooks/usePageState';
import { NearestOrganizationLabel } from 'components/NearestOrganizationLabel';
import './OrganizationPage.scss';
import { Avatar } from 'components/Avatar/Avatar';
import { Backdrop } from 'components/Backdrop';
import { BaseLayer } from 'components/BaseLayer/BaseLayer';
import { OrganizationModel } from 'models/OrganizationModel';
import dateFormat from 'date-fns/format';
import ruLocale from 'date-fns/locale/ru';

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
};

export const OrganizationPage: React.FC = props => {
  const { organizationId } = useParams();
  const history = useHistory();
  const [organizationData, setOrganizationData] = useState<OrganizationDataType>({
    address: 'загрузка...',
    creator: {
      id: 0,
      photoUrl: ''
    },
    description: '',
    id: 0,
    lastRideDatetime: new Date().toISOString(),
    maxRideCost: '-',
    minRideCost: '-',
    name: '',
    photoUrl: '',
    totalDrivers: '',
    totalMembers: ''
  });
  const [organizationMembers, setOrganizationMembers] = useState();
  const [pageState, setNext, setPrev, renderForState] = usePageState(['ORGANIZATION', 'MEMBERS']);

  useEffect(() => {
    const getData = async () => {
      const getOrganizationResponse = await OrganizationModel.get(organizationId);
      setOrganizationData({
        ...getOrganizationResponse.data
      });
      const getOrganizationParticipants = await OrganizationModel.participants(organizationId);
      console.log(getOrganizationParticipants.data);
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

  return (
    <div>
      <Backdrop>
        <Header iconType={'back'} onIconClick={handleBack}>
          <NearestOrganizationLabel nearestOrganizationName={'Mail.ru Corp'} onClick={() => {}} />
        </Header>
        {renderForState(
          'ORGANIZATION',
          <BaseLayer type={'primary'} className={'centerize centerize_bottom'}>
            <div className={'flex-row organization-page-card__head'}>
              <Avatar
                src={organizationData.creator.photoUrl}
                size={'small'}
                subtext={'Создатель'}
                className={'margin'}
              />
              <div className={'flex-column'}>
                <span>Эта организация находится по адресу:</span>
                <span className={'organization-page-card__head_address'}>
                  <b>{organizationData.address}</b>
                </span>
              </div>
            </div>
            <div className={'organization-page-card__info'}>
              <div>
                <div className={'flex-row'}>
                  <div style={{ width: '60%' }}>
                    <span>Последняя поездка с водителем из этой организации была создана</span>
                    <br />
                    <b>
                      {dateFormat(new Date(organizationData.lastRideDatetime), 'dd MMM yyyy', {
                        locale: ruLocale
                      })}
                    </b>
                  </div>
                  <div>
                    Кол-во участников:&nbsp;<b>{organizationData.totalMembers}</b>
                    <br />
                    Из них водителей:&nbsp;<b>{organizationData.totalDrivers}</b>
                    <br />
                    Пассажиров:&nbsp;<b>{+organizationData.totalMembers - +organizationData.totalDrivers}</b>
                    <br />
                    <u onClick={handleNext} className={'underlined-clickable'}>
                      Просмотреть участников
                    </u>
                  </div>
                </div>
              </div>
              <br />
              <div>
                Стоимость поездки:{' '}
                <b>
                  от {Number(organizationData.minRideCost).toFixed(0)} до{' '}
                  {Number(organizationData.maxRideCost).toFixed(0)} ₽
                </b>
              </div>
            </div>
          </BaseLayer>,
          'appear'
        )}
        {renderForState('MEMBERS', <div className={'backgrounded'}></div>, 'appear')}
      </Backdrop>
    </div>
  );
};
