import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Header } from 'components/Header';
import usePageState from '../../hooks/usePageState';
import { NearestOrganizationLabel } from 'components/NearestOrganizationLabel';
import './OrganizationPage.scss';
import { Avatar } from 'components/Avatar/Avatar';
import { sampleAvatarSrc } from 'samples/samples';
import { Backdrop } from 'components/Backdrop';
import { BaseLayer } from 'components/BaseLayer/BaseLayer';

type OrganizationDataType = {
  address: string;
};

export const OrganizationPage: React.FC = props => {
  const { organizationId } = useParams();
  const history = useHistory();
  const [organizationData, setOrganizationData] = useState<OrganizationDataType>({
    address: 'asdhflakjshfjasdhf'
  });
  const pageState = usePageState([
    {
      key: 'ORGANIZATION',
      name: ''
    },
    {
      key: 'MEMBERS',
      name: ''
    }
  ]);

  const handleBack = () => {
    if (pageState.state.key === 'ORGANIZATION') {
      history.push('/');
    } else {
      pageState.setPrev();
    }
  };
  const handleNext = () => {
    pageState.setNext();
  };

  return (
    <div>
      <Header iconType={'back'} onIconClick={handleBack}>
        <NearestOrganizationLabel nearestOrganizationName={'Mail.ru Corp'} onClick={() => {}} />
      </Header>
      {pageState.Foo(
        'ORGANIZATION',
        <Backdrop>
          <BaseLayer type={'primary'} className={'centerize centerize_floor'}>
            <div className={'flex-row organization-page-card__head'}>
              <Avatar src={sampleAvatarSrc} size={'small'} subtext={'Создатель'} className={'margin'} />
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
                    <b> 5&nbsp;марта&nbsp;2020</b>
                  </div>
                  <div>
                    Кол-во участников:&nbsp;<b>10</b>
                    <br />
                    Из них водителей:&nbsp;<b>4</b>
                    <br />
                    Пассажиров:&nbsp;<b>6</b>
                    <br />
                    <u onClick={handleNext} className={'underlined-clickable'}>
                      Просмотреть участников
                    </u>
                  </div>
                </div>
              </div>
              <br />
              <div>
                Стоимость поездки: <b>от 50 до 300 ₽</b>
              </div>
            </div>
          </BaseLayer>
        </Backdrop>
      )}
      {pageState.Foo('MEMBERS', <></>)}
    </div>
  );
};
