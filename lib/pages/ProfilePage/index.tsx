import React, { useState } from 'react';
import usePageState from 'hooks/usePageState';
import { HeaderBackground } from 'components/HeaderBackground';
import './ProfilePage.scss';
import { Avatar } from 'components/Avatar/Avatar';
import { sampleAvatarSrc } from 'samples/samples';
import { BackButton, PenIcon } from '../../icons';
import { Button } from 'components/Button';

export const ProfilePage: React.FC = props => {
  const [pageState, setNext, setPrev, renderForState] = usePageState([
    'PROFILE',
    'PROFILE_ORGANIZATIONS',
    'PROFILE_CARS',
    'PROFILE_PASSWORD'
  ]);
  const [userData, setUserData] = useState();
  const [isChanged, setIsChanged] = useState<boolean>(false);

  const onSave = () => {};

  return (
    <div className={'profile-page'}>
      <div className={'backgrounded profile-page__header'}>
        <HeaderBackground />
        <BackButton size={'medium'} />
      </div>

      <div className={'profile-page__content'}>
        <Avatar src={sampleAvatarSrc} size={'large'} />
        <span className={'user-name'}>
          Кызыл-оол Кежик <PenIcon className={'user-name__pen'} />
        </span>
        <span className={'user-id'}>ID 12321</span>

        <div className={'user-info-item'}>
          <span className={'profile-caption'}>e-mail адрес</span>
          <span className={'user-info'}>kyzyloolk@mail.ru</span>
          <PenIcon className={'user-info-item__pen'} />
        </div>

        <div className={'user-info-item'}>
          <span className={'profile-caption'}>Мобильный телефон</span>
          <span className={'user-info'}>kyzyloolk@mail.ru</span>
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
        <u className={'underlined-clickable'}>Мои автомобили</u>
        <br />
        <u className={'underlined-clickable'}>Мои организации</u>
        <br />
        <u className={'underlined-clickable'}>Сменить пароль</u>

        <br />
        <Button filled disabled={!isChanged} onClick={onSave}>
          Сохранить
        </Button>
      </div>
    </div>
  );
};
