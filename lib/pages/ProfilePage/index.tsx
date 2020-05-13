import React, { useEffect, useState } from 'react';
import Loader from 'react-loader-spinner';
import usePageState from 'hooks/usePageState/usePageState';
import { HeaderBackground } from 'components/HeaderBackground';
import { Avatar } from 'components/Avatar/Avatar';
import { BackButton, PenIcon } from '../../icons';
import { Button } from 'components/Button';
import { CarSelectBlock } from 'pages/blocks/CarSelectBlock';
import { useHistory } from 'react-router-dom';
import { LocationsList } from 'components/LocationsList';
import UserModel, { IUserData } from 'models/UserModel';
import { ILocation } from 'domain/map';
import { sampleAvatarSrc } from 'samples/samples';
import { FileUploader } from 'components/FIleUploader';
import ImageModel from 'models/ImageModel';
import { setUserAction } from 'store/actions/userActions';
import { useDispatch } from 'react-redux';
import { Dialog } from 'components/Dialog';
import { ChangeInfoDialog } from './ChangeInfoDialog';
import './ProfilePage.scss';

type editVariants = 'NAME' | 'PHONE' | 'ABOUT' | 'EMAIL';

const defaultEdit = {
  variant: null,
  payload: null
};

export const ProfilePage: React.FC = props => {
  const [pageState, setNext, setPrev, renderForState, goTo] = usePageState([
    'PROFILE',
    'PROFILE_ORGANIZATIONS',
    'PROFILE_CARS',
    'PROFILE_PASSWORD'
  ]);
  const [userData, setUserData] = useState<IUserData>();
  const [isChanged, setIsChanged] = useState<boolean>(false);
  const [isPhotoUploaded, setIsPhotoUploaded] = useState(false);
  const [isSuccessDialogShown, setIsSuccessDialogShown] = useState(false);
  const [edit, setEdit] = useState<{
    variant: editVariants;
    payload: Record<string, any>;
  }>(defaultEdit);
  const history = useHistory();
  const dispatch = useDispatch();
  const [myOrganizations, setMyOrganizations] = useState<ILocation[]>();

  useEffect(() => {
    const getUserData = async () => {
      const getOrganizationsResponse = await UserModel.getOrganizations();
      setMyOrganizations(getOrganizationsResponse);
      const getUserProfileResponse = await UserModel.getThisUser();
      setUserData(getUserProfileResponse);
      setIsPhotoUploaded(true);
    };

    if (!isPhotoUploaded) {
      getUserData();
    }
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

  const onAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsPhotoUploaded(false);
    try {
      const file = e.target.files[0];
      await ImageModel.uploadImage(file);
      const getUserProfileResponse = await UserModel.getThisUser();
      setUserData(getUserProfileResponse);
      dispatch(setUserAction(getUserProfileResponse));
    } catch (e) {
      throw new Error(e);
    } finally {
      setIsPhotoUploaded(true);
    }
  };

  const onNameEdit = () => {
    setEdit({ variant: 'NAME', payload: {} });
  };

  const onPhoneNumberEdit = () => {
    setEdit({ variant: 'PHONE', payload: {} });
  };

  const onAboutEdit = () => {
    setEdit({ variant: 'ABOUT', payload: {} });
  };

  const onEmailEdit = () => {
    setEdit({ variant: 'EMAIL', payload: {} });
  };

  const onEditingDone = async () => {
    await UserModel.updateUserInfo(edit.payload);
    const getUserProfileResponse = await UserModel.getThisUser();
    setIsSuccessDialogShown(true);
    setUserData(getUserProfileResponse);
    dispatch(setUserAction(getUserProfileResponse));
  };

  const onRedirectToOrganization = (organization: ILocation) => {
    history.push(`/organization/${organization.id}`);
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
        {isPhotoUploaded && userData ? (
          <Avatar src={userData.photoUrl || sampleAvatarSrc} size="large" />
        ) : (
          <Loader height={50} width={50} color="#242424" type="Oval" />
        )}
        <span className={'user-name'}>
          {userData && userData.firstName}&nbsp;{userData && userData.lastName}{' '}
          <div onClick={onNameEdit}>
            <PenIcon className={'user-name__pen'} />
          </div>
        </span>
        <span className={'user-id'}>ID&nbsp;{userData && userData.id}</span>

        <div className={'user-info-item'}>
          <span className={'profile-caption'}>Мобильный телефон</span>
          <span className={'user-info'}>{userData && userData.phoneNumber}</span>
          {/* <div onClick={onPhoneNumberEdit}>
            <PenIcon className={'user-info-item__pen'} />
          </div> */}
        </div>

        <div className={'user-info-item'}>
          <span className={'profile-caption'}>Электронная почта</span>
          <span className={'user-info'}>{userData && userData.email}</span>
          <div onClick={onEmailEdit}>
            <PenIcon className={'user-info-item__pen'} />
          </div>
        </div>

        <div className={'user-info-item'}>
          <span className={'profile-caption'}>О себе</span>
          <span className={'user-about'}>{(userData && userData.about) || 'Данных о пользователе пока нет'}</span>
          <div onClick={onAboutEdit}>
            <PenIcon className={'user-info-item__pen user-info-item__pen_about'} />
          </div>
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
        <FileUploader id="file" accept=".jpg, .png, .jpeg" onChange={onAvatarUpload}>
          <u className={'underlined-clickable'}>Изменить аватар</u>
        </FileUploader>

        <br />
        {/* <Button filled disabled={!isChanged} onClick={onSave}>
          Сохранить
        </Button> */}
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
          onSelectLocation={onRedirectToOrganization}
          onReadyButtonClick={onOrganizationsSave}
          onAddNewOrganization={onAddNewOrganization}
          onCreateNewOrganization={onCreateNewOrganization}
        />,
        'slideBottom'
      )}
      <ChangeInfoDialog editObject={edit} onUpdate={setEdit} onUpdateDone={onEditingDone} />
      <Dialog onClose={() => setIsSuccessDialogShown(false)} hide={!isSuccessDialogShown}>
        <h3 className="profile-page__dialog-header">Успех</h3>
        <p className="profile-page__text">Данные успешно обновлены</p>
      </Dialog>
    </div>
  );
};
