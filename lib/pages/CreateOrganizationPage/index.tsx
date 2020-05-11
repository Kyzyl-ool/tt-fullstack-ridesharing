import React, { useEffect, useState } from 'react';
import './CreateOrganization.scss';
import { Backdrop } from 'components/Backdrop';
import { Header } from 'components/Header';
import { Input } from 'components/Input';
import { useHistory } from 'react-router-dom';
import usePageState from 'hooks/usePageState/usePageState';
import { Button } from 'components/Button';
import { Dialog } from 'components/Dialog';
import { OrganizationModel } from 'models/OrganizationModel';
import { useDispatch } from 'react-redux';
import { allowCustomPointsAction, forbidCustomPointsAction } from 'store/actions/mapActions';
import { useBlurredMap } from 'hooks/mapHooks';
import MapModel from 'models/MapModel';
import { parseLocationAddress } from 'helpers/parseLocationAddress';
import UserModel from 'models/UserModel';
import { setOrganizationsAction } from 'store/actions/userActions';

type Coordinates = {
  latitude: number;
  longitude: number;
};

type QuestionAndAnswer = {
  question: string;
  answer: string;
};

export const CreateOrganizationPage: React.FC = props => {
  const [name, setName] = useState<string>('');
  const [coordinates, setCoordinates] = useState<Coordinates>({ latitude: null, longitude: null });
  const [question, setQuestion] = useState<QuestionAndAnswer>({
    question: '',
    answer: ''
  });
  const dispatch = useDispatch();
  const history = useHistory();
  const [pageState, setNext, setPrev, renderForState] = usePageState([
    'ENTER_NAME',
    'CHOOSE_LOCATION',
    'ENTER_QUESTIONS',
    'ADDED'
  ]);
  const [confirmButtonDisabled, setConfirmButtonDisabled] = useState<boolean>(true);
  const [_, setIsMapBlurred] = useBlurredMap(true);
  const [selectedAddress, setSelectedAddress] = useState('');

  useEffect(() => {
    setConfirmButtonDisabled(name.length === 0);
  }, [name]);
  useEffect(() => {
    setConfirmButtonDisabled(!(coordinates.longitude && coordinates.latitude));
  }, [coordinates]);
  useEffect(() => {
    setConfirmButtonDisabled(question.question.length === 0 || question.answer.length === 0);
  }, [question]);

  const handleClickBack = () => {
    if (pageState === 'ENTER_NAME') {
      history.push('/profile');
    } else {
      if (pageState === 'CHOOSE_LOCATION') {
        setIsMapBlurred(true);
      }
      setPrev();
    }
  };
  const handleNext = async () => {
    if (pageState === 'ENTER_NAME') {
      setIsMapBlurred(false);
    }
    if (pageState === 'ENTER_QUESTIONS') {
      setConfirmButtonDisabled(true);
      setIsMapBlurred(true);
      await OrganizationModel.put({
        name,
        controlQuestion: question.question,
        controlAnswer: question.answer,
        ...coordinates
      }).then(r => {
        setNext();
      });
    } else {
      if (pageState === 'ADDED') {
        history.push('/');
        const organizations = await UserModel.getOrganizations();
        dispatch(setOrganizationsAction(organizations));
      } else {
        setNext();
        setConfirmButtonDisabled(true);
      }
    }
  };

  const getAddress = async ({ latitude, longitude }: Coordinates) => {
    const res = await MapModel.reverseGeocoding({ latitude, longitude });
    setSelectedAddress(parseLocationAddress(res.address).name);
  };

  useEffect(() => {
    // effect allowing custom pins on the map
    dispatch(allowCustomPointsAction());
    return () => dispatch(forbidCustomPointsAction());
  }, []);

  useEffect(() => {
    if (coordinates.latitude && coordinates.longitude) {
      getAddress(coordinates);
    }
  }, [coordinates]);

  return (
    <div>
      <Header iconType="back" onIconClick={handleClickBack}>
        {renderForState('ENTER_NAME', <span className="create-organization-page__text">Новая организация</span>)}
        {renderForState(
          'CHOOSE_LOCATION',
          <span className="create-organization-page__text">Выберите местоположение</span>
        )}
        {renderForState('ENTER_QUESTIONS', <span className="create-organization-page__text">Контрольный вопрос</span>)}
      </Header>
      <Backdrop onMapClicked={newPosition => setCoordinates(newPosition)}>
        {renderForState(
          'ENTER_NAME',
          <Input
            id={'organization-name'}
            placeholderText={'Введите название новой организации'}
            className={'centerize centerize_center'}
            onChange={value => setName(value)}
          />,
          'appear'
        )}
        {renderForState(
          'CHOOSE_LOCATION',
          <>
            <Input
              id="organizationAddress"
              placeholderText="Адрес организации"
              className="centerize centerize_top"
              disabled
              defaultValue={selectedAddress}
              onChange={value => setName(value)}
            />
          </>,
          'appear'
        )}
        {renderForState(
          'ENTER_QUESTIONS',
          <div className={'backgrounded backgrounded--with-padding'}>
            <div className={'inputs-container'}>
              <Input
                className={'centered margins'}
                id={`question`}
                placeholderText={`Контрольный вопрос`}
                onChange={value => setQuestion({ ...question, question: value })}
              />
              <Input
                className={'centered margins'}
                id={`answer`}
                placeholderText={`Ответ`}
                onChange={value => setQuestion({ ...question, answer: value })}
              />
            </div>
          </div>,
          'appear'
        )}
        {renderForState(
          'ADDED',
          <Dialog onClose={handleNext} hide={false}>
            Организация успешно добавлена
          </Dialog>
        )}
        <Button filled disabled={confirmButtonDisabled} onClick={handleNext} className={'centerize centerize_bottom'}>
          Подтвердить
        </Button>
      </Backdrop>
    </div>
  );
};
