import React from 'react';
import _isEmpty from 'lodash/isEmpty';
import { connect } from 'react-redux';
import classNames from 'classnames';
import './Notifications.scss';

interface INotification {
  text: string;
  id: string;
  type?: string;
  timeout?: number;
}

interface INotificationsProps {
  notifications?: INotification[];
}

const blockClassNames = type =>
  classNames({
    notifications: true,
    [`notifications--${type}`]: true
  });

const textClassNames = type =>
  classNames({
    'notifications-text': true,
    [`notifications-text--${type}`]: true
  });

const Notifications = props => {
  return (
    !_isEmpty(props.notifications) &&
    props.notifications.map(({ type, text, id }) => (
      <div key={id} className={blockClassNames(type)}>
        <p className={textClassNames(type)}>{text}</p>
      </div>
    ))
  );
};

const mapStateToProps = state => ({
  notifications: state.nots
});

export default connect(mapStateToProps, null)(Notifications);
