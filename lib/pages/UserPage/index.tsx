import React, { useEffect, useState } from 'react';
import _isEmpty from 'lodash/isEmpty';
import { Header } from 'components/Header';
import { useHistory, useParams } from 'react-router-dom';
import UserModel, { IGetUserInfoResponseBody } from 'models/UserModel';
import { Avatar } from 'components/Avatar/Avatar';
import { useSelector } from 'react-redux';
import { sampleAvatarSrc } from 'samples/samples';
import './UserPage.scss';
import { Button } from 'components/Button';

interface IUserPage {
  requestInfo?: boolean;
}

export const UserPage: React.FC<IUserPage> = props => {
  const [userInfo, setUserInfo] = useState<IGetUserInfoResponseBody>({
    firstName: 'Загрузка...',
    id: 0,
    lastName: '',
    photoUrl: '',
    rating: 0
  });
  const history = useHistory();
  const { userId } = useParams();
  const thisUserInfo = useSelector(state => state.user.user);

  const fetchUserData = async () => {
    const res = await UserModel.getUserInfo(userId);
    console.log(res);
    setUserInfo(res);
  };

  const onBack = () => {
    // if (props.onGoBack) {
    //   props.onGoBack()
    // } else {
    // }
    history.goBack();
  };

  const toRides = () => {};

  useEffect(() => {
    if (userId) {
      fetchUserData();
    } else {
      // show current user if userId was not specified
      if (thisUserInfo.id) {
        setUserInfo(thisUserInfo);
      }
    }
  }, [userId, thisUserInfo]);

  return (
    <>
      <Header iconType={'back'} onIconClick={onBack}>
        {`${userInfo.firstName} ${userInfo.lastName}`}
      </Header>
      <div className={'user-page'}>
        <div className="user-page__user-info">
          <div className={'user-page__avatar-and-name'}>
            <Avatar src={sampleAvatarSrc} size={'large'} mark={userInfo.rating} shadowed />
            <h1>
              {userInfo.firstName} {userInfo.lastName}
            </h1>
          </div>
          <div className={'user-page__about'}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eget neque erat interdum ultrices nam metus montes,
            fusce. Nibh congue amet lacinia elit neque, scelerisque. Volutpat ante sollicitudin in faucibus. Dictum
            imperdiet velit donec massa, amet magna est.
          </div>
          <div className="user-page__rating-container">
            Текущий рейтинг:<h4 className="user-page__rating">{userInfo.rating}</h4>
          </div>
        </div>

        {!_isEmpty(props.requestInfo) && (
          <div className="user-page__buttons-wrapper">
            <Button filled>Принять</Button>
            <Button filled className="user-page__button--decline">
              Отклонить
            </Button>
          </div>
        )}
      </div>
    </>
  );
};
