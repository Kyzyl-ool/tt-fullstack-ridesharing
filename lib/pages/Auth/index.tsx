import React, { useEffect, useState } from 'react';
import usePageState from 'hooks/usePageState/usePageState';
import './Auth.scss';
import { BaseLayer } from 'components/BaseLayer/BaseLayer';
import { Button } from 'components/Button';
import { useHistory } from 'react-router-dom';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';
import { useDispatch } from 'react-redux';
import { useAuth } from 'hooks/useAuth';
// import './firebaseui-styles.css';

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
firebase.initializeApp(config);
firebase.auth().useDeviceLanguage();

export const Auth: React.FC = props => {
  const [pageState, setNext, setPrev, renderForState] = usePageState(['BEGIN', 'ENTER_PHONE']);
  const [phoneNumber, setPhoneNumber] = useState<string>();
  const [smsCode, setSmsCode] = useState<string>('');
  const [waiting, setWaiting] = useState<boolean>(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const [auth, , , check] = useAuth();

  const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // signInSuccessUrl: '/',
    signInOptions: [
      {
        provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
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
        if (!isNewUser) {
          ///@todo remove "!"
          history.push('/welcome');
        } else {
          history.push('/');
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
      case 'ENTER_PHONE': {
        break;
      }
      case 'SMS_CODE': {
        history.push('/welcome');
        break;
      }
      default:
        break;
    }
    setNext();
    setWaiting(false);
  };

  return (
    <div className={'auth-page'}>
      <div className={'auth-page__background'} />
      <h1 className={'auth-page__brand'}>RideSharing</h1>
      {renderForState(
        'BEGIN',
        <BaseLayer type={'primary'} header={<>Авторизоваться</>} className={'auth-page__base-layer'}>
          <Button onClick={handleNext} filled>
            По номеру телефона
          </Button>
        </BaseLayer>,
        'appear'
      )}
      {renderForState(
        'ENTER_PHONE',
        <BaseLayer type={'primary'} header={<>Авторизоваться по номеру телефона</>} className={'auth-page__base-layer'}>
          <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
        </BaseLayer>,
        'appear'
      )}
      <span className={'auth-page__authors'}>
        Кежик Кызыл-оол, Никита Израилев, Алексей Кожарин
        <br />
        Технотрек 2020
      </span>
    </div>
  );
};
