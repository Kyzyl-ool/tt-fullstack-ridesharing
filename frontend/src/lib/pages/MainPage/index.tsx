import React, { PureComponent } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Button } from '@material-ui/core';
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

  public redirectPassenger = () => {
    this.onPassengerButtonClick();
    return <Redirect to="/search_trip" />;
  };

  render() {
    return (
      <div className="main-page__container">
        <div className="main-page__button-container">
          {this.props.isUserDriver && (
            <Link style={{ textDecoration: 'none' }} to="/new_trip">
              <Button onClick={this.onDriverButtonClick} size="large">
                <div className="main-page__button">Водитель</div>
              </Button>
            </Link>
          )}
          <Link style={{ textDecoration: 'none' }} to="/search_trip">
            <Button onClick={this.onPassengerButtonClick} size="large">
              <div className="main-page__button">Пассажир</div>
            </Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
