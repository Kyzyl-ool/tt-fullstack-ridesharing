import React, { PureComponent } from 'react';
import { Button, Typography } from '@material-ui/core';
import _isEmpty from 'lodash/isEmpty';
import { connect } from 'react-redux';
import ImageModel from '../../models/imageModel';
import { Avatar } from '../../components/Avatar/Avatar';
import './UserProfilePage.scss';
import { updateAvatarAction, setUserDataAction } from '../../store/actions/userActions';
import { ICar } from '../../domain/car';
import { IUser } from '../../domain/user';
import EditableField from '../../components/EditableField';
import UserModel from '../../models/userModel';
import addNotification from '../../store/actions/notificationsActions';

interface INotification {
  text: string;
  type: 'success' | 'failure';
}

interface IUserProfilePageProps {
  avatarUrl: string;
  isDriver: boolean;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  cars: ICar[];
  setUserData: (userData: IUser) => void;
  addNotification: (notification: INotification) => void;
  updateAvatar: (newAvatar: string) => void;
}

class UserProfilePage extends PureComponent<IUserProfilePageProps> {
  public uploadInput: HTMLInputElement;

  public uploadImage = async () => {
    const file = this.uploadInput.files[0];
    const url = await ImageModel.uploadImage(file);
    this.props.updateAvatar(url);
  };

  public refreshUserInfo = async () => {
    const userData = await UserModel.getUserData();
    this.props.setUserData(userData);
  };

  public changeField = async (name: string, value: string) => {
    let res;
    if (name === 'phoneNumber') {
      res = await UserModel.updatePhoneNumber(name, value);
    }
    if (name === 'email') {
      res = await UserModel.updateEmail(name, value);
    }
    if (res) {
      this.refreshUserInfo();
      this.props.addNotification({ type: 'success', text: 'Информация обновлена' });
    } else {
      this.props.addNotification({ type: 'failure', text: 'К сожалению, не получилось обновить информацию' });
    }
  };

  public render() {
    const { avatarUrl, firstName, lastName, phoneNumber, email, isDriver, cars } = this.props;
    const fullName = `${firstName} ${lastName}`;
    //for now we have the only one car for one driver
    const userCar = cars[0];
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
          {/* <p className="user-profile-page__contact-content">{email}</p> */}
          <EditableField
            id="email"
            onReady={this.changeField}
            value={email}
            label="E-mail"
            textClassName="user-profile-page__contact-content"
          />
          <div className="user-profile-page__contact-header">
            <Typography variant="h5">Номер телефона</Typography>
          </div>
          <EditableField
            id="phoneNumber"
            value={phoneNumber}
            label="Номер телефона"
            onReady={this.changeField}
            textClassName="user-profile-page__contact-content"
          />
          <div className="user-profile-page__contact-header">
            <Typography variant="h5">Telegram</Typography>
          </div>
          <p className="user-profile-page__contact-content">—</p>
          <div className="user-profile-page__section-header">Сведения об автомобиле</div>
          {isDriver && !_isEmpty(cars) ? (
            <>
              <div className="user-profile-page__vehicle-details">
                <div className="user-profile-page__contact-header">
                  <Typography variant="h6">Цвет</Typography>
                </div>
                <p className="user-profile-page__vehicle-header">{userCar.color}</p>
              </div>
              <div className="user-profile-page__vehicle-details">
                <div className="user-profile-page__contact-header">
                  <Typography variant="h6">Марка</Typography>
                </div>
                <p className="user-profile-page__vehicle-header">{userCar.model}</p>
              </div>
              <div className="user-profile-page__vehicle-details">
                <div className="user-profile-page__contact-header">
                  <Typography variant="h6">Номер</Typography>
                </div>
                <p className="user-profile-page__vehicle-header">{userCar.registryNumber}</p>
              </div>
            </>
          ) : isDriver ? (
            <div className="user-profile-page__no-driver-placeholder">Пока что Вы не добавили информацию о машине</div>
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
    lastName: state.usr.lastName,
    cars: state.car.cars
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateAvatar: newAvatar => dispatch(updateAvatarAction(newAvatar)),
    addNotification: ({ type, text }) => dispatch(addNotification({ type, text })),
    setUserData: userData => dispatch(setUserDataAction(userData))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserProfilePage);
