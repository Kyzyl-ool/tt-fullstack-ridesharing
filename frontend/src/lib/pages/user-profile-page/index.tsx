import React, { PureComponent } from 'react';
import { Button, Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import ImageModel from '../../models/imageModel';
import { Avatar } from '../../components/Avatar/Avatar';
import './UserProfilePage.scss';
import { updateAvatarAction } from '../../store/actions/userActions';

interface IUserProfilePageProps {
  avatarUrl: string;
  isDriver: boolean;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  updateAvatar: (newAvatar: string) => void;
}

class UserProfilePage extends PureComponent<IUserProfilePageProps> {
  public uploadInput: HTMLInputElement;

  public uploadImage = async () => {
    const file = this.uploadInput.files[0];
    const url = await ImageModel.uploadImage(file);
    this.props.updateAvatar(url);
  };

  public render() {
    const { avatarUrl, firstName, lastName, phoneNumber, email, isDriver } = this.props;
    const fullName = `${firstName} ${lastName}`;
    return (
      <div className="user-profile-page__container">
        <div className="user-profile-page__main-info">
          <div className="user-profile-page__avatar">
            <Avatar noResize src={avatarUrl} />
            <input
              style={{ display: 'none' }}
              ref={ref => {
                this.uploadInput = ref;
              }}
              type="file"
              accept="image/*"
              onChange={this.uploadImage}
            />
            <Button onClick={() => this.uploadInput.click()} size="small">
              Изменить
            </Button>
          </div>
          <p className="user-profile-page__name">{fullName}</p>
        </div>
        <div className="user-profile-page__contact-info">
          <div className="user-profile-page__section-header">Контактные данные</div>
          <div className="user-profile-page__contact-header">
            <Typography variant="h5">Электронная почта</Typography>
          </div>
          <p className="user-profile-page__contact-content">{email}</p>
          <div className="user-profile-page__contact-header">
            <Typography variant="h5">Номер телефона</Typography>
          </div>
          <p className="user-profile-page__contact-content">{phoneNumber}</p>
          <div className="user-profile-page__contact-header">
            <Typography variant="h5">Telegram</Typography>
          </div>
          <p className="user-profile-page__contact-content">—</p>
          <div className="user-profile-page__section-header">Сведения об автомобиле</div>
          {isDriver ? (
            <div></div>
          ) : (
            <div className="user-profile-page__no-driver-placeholder">Пока что Вы не зарегистрированы как водитель</div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isDriver: state.usr.isDriver,
    avatarUrl: state.usr.photoUrl,
    email: state.usr.email,
    phoneNumber: state.usr.phoneNumber,
    firstName: state.usr.firstName,
    lastName: state.usr.lastName
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateAvatar: newAvatar => dispatch(updateAvatarAction(newAvatar))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfilePage);
