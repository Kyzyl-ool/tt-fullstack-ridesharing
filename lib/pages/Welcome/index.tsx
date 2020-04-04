import React, { useEffect, useState } from 'react';
import { Header } from 'components/Header';
import { NearestOrganizationLabel } from 'components/NearestOrganizationLabel';
import { Dialog } from 'components/Dialog';
import { Input } from 'components/Input';
import { Backdrop } from 'components/Backdrop';
import usePageState from '../../hooks/usePageState';
import { useHistory } from 'react-router-dom';
import './Welcome.scss';

export const Welcome: React.FC = props => {
  const [pageState, setNext, setPrev, renderForState] = usePageState(['NAMES', 'TELEGRAM', 'FINISH']);
  const history = useHistory();
  const [authorized, setAuthorized] = useState<boolean>(false);

  useEffect(() => {
    if (authorized) {
      history.push('/');
    }
  }, []);

  const handleNext = () => {
    if (pageState === 'FINISH') {
      history.push('/');
    } else {
      setNext();
    }
  };

  return (
    <div className={'welcome'}>
      <Backdrop>
        <Header iconType={'menu'} onIconClick={() => {}}>
          <NearestOrganizationLabel onClick={() => {}} />
        </Header>

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
            <p className={'welcome__text'}>Добро пожаловать! Введите, пожалуйста, регистрационные данные:</p>
            <Input id={'last-name'} placeholderText={'Фамилия'} placeholderType={'subscript'} />
            <Input id={'first-name'} placeholderText={'Имя'} placeholderType={'subscript'} />
          </Dialog>,
          'appear'
        )}
        {renderForState(
          'TELEGRAM',
          <Dialog onClose={handleNext} hide={false} buttonText={'Подтвердить'} cross={false} withRedirectTo={false}>
            <p className={'welcome__text'}>Введите ваш Telegram для связи:</p>
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
