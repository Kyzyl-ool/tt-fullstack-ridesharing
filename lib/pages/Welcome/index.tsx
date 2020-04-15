import React, { useEffect, useState } from 'react';
import { Header } from 'components/Header';
import { NearestOrganizationLabel } from 'components/NearestOrganizationLabel';
import { Dialog } from 'components/Dialog';
import { Input } from 'components/Input';
import { Backdrop } from 'components/Backdrop';
import usePageState from 'hooks/usePageState/usePageState';
import { useHistory } from 'react-router-dom';
import './Welcome.scss';
import UserModel from 'models/UserModel';
import { useSelector } from 'react-redux';

export const Welcome: React.FC = props => {
  const [pageState, setNext, setPrev, renderForState] = usePageState(['PASSWORD', 'NAMES', 'FINISH']);
  const history = useHistory();
  const [authorized, setAuthorized] = useState<boolean>(false);
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [password1, setPassword1] = useState<string>('');
  const [password2, setPassword2] = useState<string>('');
  const { phoneNumber } = useSelector(state => state.auth);

  const register = async (): Promise<number> => {
    const { userId: userId } = await UserModel.registerUser({
      email: null,
      firstName: firstName,
      lastName: lastName,
      organizations: null,
      password: password1,
      phoneNumber: phoneNumber
    });
    return userId;
  };

  useEffect(() => {
    if (authorized) {
      history.push('/');
    }
  }, []);

  const handleNext = async () => {
    switch (pageState) {
      case 'NAMES': {
        try {
          const userId = await register();
          setNext();
        } catch (e) {
          console.error(e);
        }
        break;
      }
      case 'FINISH': {
        history.push('/');
        break;
      }
      default: {
        setNext();
        break;
      }
    }
  };

  return (
    <div className={'welcome'}>
      <Backdrop>
        <Header iconType={'menu'} onIconClick={() => {}}>
          <NearestOrganizationLabel onClick={() => {}} />
        </Header>
        {renderForState(
          'PASSWORD',
          <Dialog
            onClose={handleNext}
            hide={false}
            cross={false}
            buttonText={'Подтвердить'}
            redirectTo={''}
            withRedirectTo={false}
            confirmButtonDisabled={password1.length === 0 || password1 !== password2}
          >
            <p className={'welcome__text'}>Добро пожаловать! Придумайте, пожалуйста, пароль для входа в приложение:</p>
            <Input
              id={'password1'}
              placeholderText={'Ваш пароль'}
              placeholderType={'subscript'}
              type={'password'}
              onChange={value => setPassword1(value)}
            />
            <Input
              id={'password2'}
              placeholderText={'Пароль еще раз'}
              placeholderType={'subscript'}
              type={'password'}
              onChange={value => setPassword2(value)}
            />
          </Dialog>,
          'appear'
        )}
        {renderForState(
          'NAMES',
          <Dialog
            onClose={handleNext}
            hide={false}
            buttonText={'Подтвердить'}
            cross={false}
            redirectTo={''}
            withRedirectTo={false}
          >
            <p className={'welcome__text'}>Введите, пожалуйста, Ваши регистрационные данные:</p>
            <Input
              id={'last-name'}
              placeholderText={'Фамилия'}
              placeholderType={'subscript'}
              onChange={value => setFirstName(value)}
            />
            <Input
              id={'first-name'}
              placeholderText={'Имя'}
              placeholderType={'subscript'}
              onChange={value => setLastName(value)}
            />
          </Dialog>,
          'appear'
        )}
        {renderForState(
          'TELEGRAM',
          <Dialog onClose={handleNext} hide={false} buttonText={'Подтвердить'} cross={false} withRedirectTo={false}>
            <p className={'welcome__text'}>Введите Ваш Telegram для связи:</p>
            <Input id={'telegram'} placeholderText={'Telegram'} placeholderType={'subscript'} />
          </Dialog>,
          'appear'
        )}
        {renderForState(
          'FINISH',
          <Dialog onClose={handleNext} hide={false} buttonText={'Подтвердить'} withRedirectTo={false}>
            <p className={'welcome__text'}>Поздравляем! Вы успешно зарегистрировались в приложении RideSharing!</p>
          </Dialog>,
          'appear'
        )}
      </Backdrop>
    </div>
  );
};
