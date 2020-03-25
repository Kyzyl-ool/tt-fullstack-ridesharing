import React from 'react';
import './RidesHistory.scss';
import { DoneRide } from 'components/DoneRide';
import { sampleAvatarSrc } from 'samples/samples';
import { Header } from 'components/Header';
import { useHistory } from 'react-router-dom';

export const RidesHistoryPage: React.FC = props => {
  const history = useHistory();

  const handleBack = () => {
    history.push('/');
  };

  return (
    <div>
      <Header iconType={'back'} onIconClick={handleBack}>
        История поездок
      </Header>
      <div className={'rides-history-page'}>
        <DoneRide
          driver={{ avatarSrc: sampleAvatarSrc, firstName: 'Kezhik', lastName: 'Kyzyl-ool' }}
          from={'Abakan'}
          to={'Moscow'}
          date={'2005-08-09T18:31:42'}
          cost={300}
          rideId={0}
        />
        <DoneRide
          driver={{ avatarSrc: sampleAvatarSrc, firstName: 'Kezhik', lastName: 'Kyzyl-ool' }}
          from={'Abakan'}
          to={'Moscow'}
          date={'2005-08-09T18:31:42'}
          cost={300}
          rideId={0}
        />
        <DoneRide
          driver={{ avatarSrc: sampleAvatarSrc, firstName: 'Kezhik', lastName: 'Kyzyl-ool' }}
          from={'Abakan'}
          to={'Moscow'}
          date={'2005-08-09T18:31:42'}
          cost={300}
          rideId={0}
        />
      </div>
    </div>
  );
};
