import React, { useEffect, useState } from 'react';
import { Header } from 'components/Header';
import { useHistory, useParams } from 'react-router-dom';
import UserModel, { IGetUserInfoResponseBody } from 'models/UserModel';
import './UserPage.scss';
import { Avatar } from 'components/Avatar/Avatar';
import { Button } from 'components/Button';

export const UserPage: React.FC = props => {
  const [userInfo, setUserInfo] = useState<IGetUserInfoResponseBody>({
    firstName: 'Загрузка...',
    id: 0,
    lastName: '',
    photoUrl: '',
    rating: 0
  });
  const history = useHistory();
  const { userId } = useParams();

  const fetchUserData = async () => {
    const res = await UserModel.getUserInfo(userId);
    setUserInfo(res);
  };

  const onBack = () => {
    history.goBack();
  };

  const toRides = () => {};

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <>
      <Header iconType={'back'} onIconClick={onBack}>
        {userInfo.firstName}&nbsp;{userInfo.lastName}
      </Header>
      <div className={'user-page'}>
        <div className={'user-page__avatar-and-name'}>
          <Avatar src={userInfo.photoUrl} size={'large'} mark={userInfo.rating} shadowed />
          <h1>
            {userInfo.firstName} {userInfo.lastName}
          </h1>
        </div>
        <div className={'user-page__about'}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eget neque erat interdum ultrices nam metus montes,
          fusce. Nibh congue amet lacinia elit neque, scelerisque. Volutpat ante sollicitudin in faucibus. Dictum
          imperdiet velit donec massa, amet magna est.
        </div>
        <Button onClick={toRides}>Просмотреть поездки</Button>
      </div>
    </>
  );
};
