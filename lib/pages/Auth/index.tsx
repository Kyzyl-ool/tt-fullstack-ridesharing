import React, { useEffect, useState } from 'react';
import usePageState from 'hooks/usePageState/usePageState';
import './Auth.scss';
import { BaseLayer } from 'components/BaseLayer/BaseLayer';
import { Button } from 'components/Button';
import { useHistory } from 'react-router-dom';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { initializeApp, auth, messaging as fireMessaging } from '../../firebase';
import { useDispatch } from 'react-redux';
import { useAuth } from 'hooks/useAuth';
import { Input } from 'components/Input';
import './firebaseui-styles.css';
import { DoubleArrowBlackIcon, DoubleArrowIcon } from '../../icons';
import { useBackButton } from 'hooks/useBackButton/useBackButton';
import { updateFirebaseRegistrationToken } from 'models/NotificationsModel';

// Configure Firebase.
const config = {
  apiKey: 'AIzaSyBuahCKvh1qBwvi_rWIlFTjW0d3cOUam6U',
  authDomain: 'ridesharing-97d64.firebaseapp.com',
  databaseURL: 'https://ridesharing-97d64.firebaseio.com',
  projectId: 'ridesharing-97d64',
  storageBucket: 'ridesharing-97d64.appspot.com',
  messagingSenderId: '992567280786',
  appId: '1:992567280786:web:2c7cc8b2bc6a876295524b',
  measurementId: 'G-NR1FBNG3QY'
};
const app = initializeApp(config);
auth().useDeviceLanguage();

const messaging = fireMessaging(app);

// Add the public key generated from the console here.
messaging.usePublicVapidKey('BAD9bEd-7agtvjNvcHN7PT-NAg5fjUBXzx9VLpTW6wp5YjR4rT4snip7ZlvosekjWfHP3rJXq9I1NHsqoAWK2M8');
messaging
  .getToken()
  .then(currentToken => {
    updateFirebaseRegistrationToken(currentToken);
  })
  .catch(err => {
    console.log('An error occurred while retrieving token. ', err);
  });
// Callback fired if Instance ID token is updated.
messaging.onTokenRefresh(() => {
  messaging
    .getToken()
    .then(refreshedToken => {
      updateFirebaseRegistrationToken(refreshedToken);
    })
    .catch(err => {
      console.log('Unable to retrieve refreshed token ', err);
    });
});

messaging.onMessage(value => {
  console.log(value);
});

export const Auth: React.FC = props => {
  const [pageState, setNext, setPrev, renderForState, goTo] = usePageState([
    'BEGIN',
    'ENTER_PHONE',
    'ENTER_PASSWORD',
    'LANDING',
    'FIND_TRIPS'
  ]);
  const [phoneNumber, setPhoneNumber] = useState<string>();
  const [password, setPassword] = useState<string>('');
  const [waiting, setWaiting] = useState<boolean>(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const [errored, setErrored] = useState<boolean>(false);
  const [, login] = useAuth();
  useBackButton(() => {
    switch (pageState) {
      case 'ENTER_PHONE': {
        setPrev();
        break;
      }
      case 'LANDING': {
        goTo('BEGIN');
        break;
      }
      case 'FIND_TRIPS': {
        goTo('BEGIN');
        break;
      }
      default: {
        break;
      }
    }
  });

  const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // signInSuccessUrl: '/',
    signInOptions: [
      {
        provider: auth.PhoneAuthProvider.PROVIDER_ID,
        defaultCountry: 'RU',
        whitelistedCountries: ['+7'],
        recaptchaParameters: {
          type: 'image', // 'audio'
          size: 'invisible', // 'invisible' or 'compact'
          badge: 'bottomleft' //' bottomright' or 'inline' applies to invisible.
        }
      }
    ],
    callbacks: {
      signInSuccessWithAuthResult: (currentUser: firebase.auth.UserCredential, redirectUrl: string) => {
        console.log('signInSuccess');
        console.log('currentUser:', currentUser);
        const { isNewUser } = currentUser.additionalUserInfo;
        console.log('isNewUser:', isNewUser);
        setPhoneNumber(currentUser.user.phoneNumber);
        dispatch({
          type: 'SET_PHONE_NUMBER',
          payload: {
            phoneNumber: currentUser.user.phoneNumber
          }
        });
        if (isNewUser) {
          history.push('/welcome');
        } else {
          // UserModel.login(phoneNumber)
          setNext();
        }
      },
      signInFailure: (error: string) => {
        console.log('error:', error);
      }
    }
  };

  const handleNext = async () => {
    setWaiting(true);
    switch (pageState) {
      case 'ENTER_PASSWORD': {
        if (await login(phoneNumber, password)) {
          history.push('/');
        } else {
          setErrored(true);
        }
        break;
      }
      default: {
        setNext();
        break;
      }
    }
    setWaiting(false);
  };

  const scrollToTop = () => {
    document.querySelector('div.landing-page__container').scroll({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    setErrored(false);
  }, [password]);

  return (
    <div className={'auth-page'}>
      <div className={'landing-page__background'} />
      {renderForState(
        'BEGIN',
        <div className="landing-page__container">
          <div className="landing-page__auth">
            <h1 className={'auth-page__brand'}>Ridesharing</h1>
            <div className={'auth-page__base-layer'}>
              <Button onClick={handleNext}>
                <b>Регистрация / Вход</b>
              </Button>
            </div>
            <span className={'auth-page__footer'}>
              Подробнее о приложении
              <div>
                <DoubleArrowIcon className="animated-arrow-icon" />
              </div>
            </span>
          </div>
          <div className={'landing-page'}>
            <div className={'landing-page__text'}>
              <b>Что такое Ridesharing?</b>
              <p>
                Поиск попутчиков, но только в рамках одного города и среди ваших друзей, коллег, знакомых в одной
                организации
              </p>
            </div>
            <div className={'landing-page__downtown'} />
            <span className={'auth-page__footer auth-page__footer_black'}>
              Как организованы поездки?
              <DoubleArrowBlackIcon className="animated-arrow-icon" />
            </span>
          </div>
          <div className={'landing-page'}>
            <div className={'landing-page__text'}>
              <b>Присоединяйтесь к организации</b>
              <p>Или создайте ее, чтобы организовать круг доверенных лиц</p>
              <b>Создавайте поездку</b>
              <p>Можно создать свою или присоединиться к подходящей из существующих</p>
              <b>Добирайтесь до пункта назначения вместе!</b>
            </div>
            <div className={'landing-page__tandembike'} />
            <span className={'auth-page__footer auth-page__footer_black'}>
              В начало
              <div onClick={scrollToTop} className="animated-arrow-icon">
                <DoubleArrowBlackIcon className="landing-page__revert-icon" />
              </div>
            </span>
          </div>
        </div>,
        'appear'
      )}
      {renderForState(
        'ENTER_PHONE',
        <>
          <BaseLayer
            type={'primary'}
            header={<>Авторизация по номеру телефона</>}
            className={'auth-page__base-layer auth-page__base-layer_shadowed auth-page__base-layer--for-auth'}
          >
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth()} />
            <Button className="auth-page__back-button" onClick={setPrev}>
              <b>Назад</b>
            </Button>
          </BaseLayer>
        </>,
        'appear'
      )}
      {renderForState(
        'ENTER_PASSWORD',
        <>
          <h1 className={'auth-page__brand'}>Ridesharing</h1>
          <BaseLayer type={'primary'} header={<>Введите пароль</>} className={'auth-page__base-layer'}>
            <Input
              id={'password'}
              placeholderText={'Пароль'}
              onChange={value => setPassword(value)}
              type={'password'}
              errored={errored}
            />
            <Button onClick={handleNext} filled disabled={waiting}>
              {waiting ? 'Ожидание...' : 'Подтвердить'}
            </Button>
          </BaseLayer>
        </>,
        'appear'
      )}
    </div>
  );
};
