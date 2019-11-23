import React, { PureComponent } from 'react';
import { Container, Button, Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import ImageModel from '../../models/imageModel';
import { Avatar } from '../../components/Avatar/Avatar';
import './UserProfilePage.scss';

interface IUserProfilePageProps {
  avatarUrl: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
}

class UserProfilePage extends PureComponent<IUserProfilePageProps> {
  public uploadInput: HTMLInputElement;

  public uploadImage = async () => {
    const file = this.uploadInput.files[0];
    const url = await ImageModel.uploadImage(file);
    console.log(url, 'URL');
  };

  public render() {
    const { avatarUrl, firstName, lastName, phoneNumber, email } = this.props;
    const fullName = `${firstName} ${lastName}`;
    return (
      <div className="user-profile-page__container">
        <div className="user-profile-page__main-info">
          <div className="user-profile-page__avatar">
            <Avatar src={avatarUrl} />
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
          <div className="user-profile-page__contact-header">
            <Typography variant="h5">Электронная почта</Typography>
          </div>
          <p className="user-profile-page__contact-content">{email}</p>
          <div className="user-profile-page__contact-header">
            <Typography variant="h5">Номер телефона</Typography>
          </div>
          <p className="user-profile-page__contact-content">{phoneNumber}</p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    avatarUrl: state.usr.photo,
    email: state.usr.email,
    phoneNumber: state.usr.phoneNumber,
    firstName: state.usr.firstName,
    lastName: state.usr.lastName
  };
};

export default connect(mapStateToProps, null)(UserProfilePage);
