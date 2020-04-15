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
  const [coordinates, setCoordinates] = useState<Coordinates>({ latitude: -1, longitude: -1 });
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
  useEffect(() => {
    setConfirmButtonDisabled(name.length === 0);
  }, [name]);
  useEffect(() => {
    setConfirmButtonDisabled(coordinates.longitude === -1 && coordinates.latitude === -1);
  }, [coordinates]);
  useEffect(() => {
    setConfirmButtonDisabled(question.question.length === 0 || question.answer.length === 0);
  }, [question]);

  const handleClickBack = () => {
    if (pageState === 'ENTER_NAME') {
      history.push('/');
    } else {
      setPrev();
    }
  };
  const handleNext = async () => {
    if (pageState === 'ENTER_QUESTIONS') {
      setConfirmButtonDisabled(true);
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
      } else {
        setNext();
        setConfirmButtonDisabled(true);
      }
    }
  };

  useEffect(() => {
    // effect allowing custom pins on the map
    dispatch(allowCustomPointsAction());
    return () => dispatch(forbidCustomPointsAction());
  });

  return (
    <div>
      <Header iconType="back" onIconClick={handleClickBack}>
        {renderForState('ENTER_NAME', <span>Новая организация</span>)}
        {renderForState('CHOOSE_LOCATION', <span>Выберите местоположение</span>)}
        {renderForState('ENTER_QUESTIONS', <span>Контрольный вопрос</span>)}
      </Header>
      <Backdrop onMapClicked={newPosition => setCoordinates(newPosition)}>
        {renderForState(
          'ENTER_NAME',
          <>
            <Input
              id={'organization-name'}
              placeholderText={'Введите название новой организации'}
              className={'centerize centerize_center'}
              onChange={value => setName(value)}
            />
          </>,
          'appear'
        )}
        {renderForState('CHOOSE_LOCATION', <></>, 'appear')}
        {renderForState(
          'ENTER_QUESTIONS',
          <div className={'backgrounded backgrounded--with-padding'}>
            <div>
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
