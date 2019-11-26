import React, { PureComponent } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Button } from '@material-ui/core';
import RoleButton from '../../components/RoleButton';
import { connect } from 'react-redux';
import { setRoleAction } from '../../store/actions';
import './MainPage.scss';

interface IMainPageProps {
  setRole: (role: string) => void;
  isUserDriver: boolean;
}

class MainPage extends PureComponent<IMainPageProps> {
  public onDriverButtonClick = () => {
    this.props.setRole('DRIVER');
  };
  public onPassengerButtonClick = () => {
    this.props.setRole('PASSENGER');
  };

  render() {
    return (
      <div className="main-page__container">
        <div className="main-page__button-container">
          <Link style={{ textDecoration: 'none' }} to={this.props.isUserDriver ? '/new_trip' : '/main'}>
            <RoleButton
              role="driver"
              disable={!this.props.isUserDriver}
              onClick={this.onDriverButtonClick}
              label="Водитель"
              className="main-page__button"
              comment={
                this.props.isUserDriver
                  ? 'Выберите, чтобы создать поездку и найти спутников'
                  : 'К сожалению, вы не зарегистрированы как водитель'
              }
            />
          </Link>
          <Link style={{ textDecoration: 'none' }} to="/search_trip">
            <RoleButton
              role="passenger"
              onClick={this.onPassengerButtonClick}
              label="Пассажир"
              className="main-page__button"
              comment="Выберите, чтобы найти коллегу, с которым Вам по пути"
            />
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isUserDriver: state.usr.isDriver
});

const mapDispatchToProps = dispatch => {
  return {
    setRole: role => dispatch(setRoleAction(role))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainPage);
