import React, { useEffect, useState } from 'react';
import usePageState from 'hooks/usePageState';
import { HeaderBackground } from 'components/HeaderBackground';
import './ProfilePage.scss';
import { Avatar } from 'components/Avatar/Avatar';
import { BackButton, PenIcon } from '../../icons';
import { Button } from 'components/Button';
import { CarInfo, CarSelectBlock } from 'pages/blocks/CarSelectBlock';
import { useHistory } from 'react-router-dom';
import { LocationsList } from 'components/LocationsList';
import UserModel, { IUserData } from 'models/UserModel';
import { ILocation } from 'domain/map';
import { sampleAvatarSrc } from 'samples/samples';

export const ProfilePage: React.FC = props => {
  const [pageState, setNext, setPrev, renderForState, goTo] = usePageState([
    'PROFILE',
    'PROFILE_ORGANIZATIONS',
    'PROFILE_CARS',
    'PROFILE_PASSWORD'
  ]);
  const [userData, setUserData] = useState<IUserData>();
  const [isChanged, setIsChanged] = useState<boolean>(false);
  const history = useHistory();
  const [myOrganizations, setMyOrganizations] = useState<ILocation[]>();

  useEffect(() => {
    const getUserData = async () => {
      const getOrganizationsResponse = await UserModel.getOrganizations();
      setMyOrganizations(getOrganizationsResponse);
      const getUserProfileResponse = await UserModel.getMyProfileInfo();
      setUserData(getUserProfileResponse);
      const getMyCars = await UserModel.getCars();
    };

    getUserData();
  }, []);

  const onDeleteCar = async id => {
    await UserModel.deleteCar({ id });
  };

  const onCarInfoChange = async (carId: string, carInformation) => {
    await UserModel.postCar({
      id: +carId,
      model: carInformation.name,
      color: carInformation.color,
      registryNumber: carInformation.number
    });
  };

  const onSave = () => {};

  const onAddNewOrganization = () => {
    history.push('/organization/join');
  };

  const onOrganizationsSave = async () => {
    goTo('PROFILE');
  };

  const onBack = () => {
    if (pageState === 'PROFILE') {
      history.push('/');
    } else {
      goTo('PROFILE');
    }
  };

  const onCreateNewOrganization = () => {
    history.push('/organization/create');
  };

  return (
    <div className={'profile-page'}>
      <div onClick={onBack}>
        <BackButton size={'medium'} />
      </div>
      <div className={'backgrounded profile-page__header'}>
        <HeaderBackground />
      </div>

      <div className={'profile-page__content'}>
        {/* <Avatar src={userData && userData.photoUrl} size={'large'} /> */}
        <Avatar src={userData && sampleAvatarSrc} size="large" />
        <span className={'user-name'}>
          {userData && userData.firstName}&nbsp;{userData && userData.lastName} <PenIcon className={'user-name__pen'} />
        </span>
        <span className={'user-id'}>ID&nbsp;{userData && userData.id}</span>

        <div className={'user-info-item'}>
          <span className={'profile-caption'}>e-mail адрес</span>
          <span className={'user-info'}>{userData && userData.email}</span>
          <PenIcon className={'user-info-item__pen'} />
        </div>

        <div className={'user-info-item'}>
          <span className={'profile-caption'}>Мобильный телефон</span>
          <span className={'user-info'}>{userData && userData.phoneNumber}</span>
          <PenIcon className={'user-info-item__pen'} />
        </div>

        <div className={'user-info-item'}>
          <span className={'profile-caption'}>О себе</span>
          <span className={'user-about'}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Augue blandit nascetur enim quam. Et suscipit non
            aenean nibh massa augue. Morbi lacinia sit tincidunt nisl commodo id enim tempor, elementum. Lacus eget dui
            velit malesuada adipiscing nunc, in id duis.
          </span>
          <PenIcon className={'user-info-item__pen user-info-item__pen_about'} />
        </div>

        <br />
        <u className={'underlined-clickable'} onClick={() => goTo('PROFILE_CARS')}>
          Мои автомобили
        </u>
        <br />
        <u className={'underlined-clickable'} onClick={() => goTo('PROFILE_ORGANIZATIONS')}>
          Мои организации
        </u>
        <br />
        <u className={'underlined-clickable'} onClick={() => goTo('PROFILE_PASSWORD')}>
          Сменить пароль
        </u>

        <br />
        <Button filled disabled={!isChanged} onClick={onSave}>
          Сохранить
        </Button>
      </div>
      <CarSelectBlock
        onDelete={id => onDeleteCar(id)}
        onCarInfoChange={onCarInfoChange}
        onCarSelect={() => {}}
        onGoBack={() => goTo('PROFILE')}
        visible={pageState === 'PROFILE_CARS'}
        onClick={() => {}}
        hideBackButton
        withBottomButton={false}
        withAddNewCarButton
        headerText={'Ваши автомобили'}
        withClickableCars={false}
      />
      {renderForState(
        'PROFILE_ORGANIZATIONS',
        <LocationsList
          text={'Ваши организации:'}
          locations={myOrganizations}
          onSelectLocation={() => {}}
          onReadyButtonClick={onOrganizationsSave}
          onAddNewOrganization={onAddNewOrganization}
          onCreateNewOrganization={onCreateNewOrganization}
        />,
        'slideBottom'
      )}
    </div>
  );
};
