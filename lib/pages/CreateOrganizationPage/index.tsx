import React, { useState } from 'react';
import './CreateOrganization.scss';
import { Backdrop } from 'components/Backdrop';
import { Header } from 'components/Header';
import { Input } from 'components/Input';
import { useHistory } from 'react-router-dom';
import usePageState from '../../hooks/usePageState';
import { Button } from 'components/Button';
import { Dialog } from 'components/Dialog';

type Coordinates = {
  latitude: number;
  longitude: number;
};

type QuestionAndAnswer = {
  question: string;
  answer: string;
};

export const CreateOrganizationPage: React.FC = props => {
  const [name, setName] = useState<string>();
  const [coordinates, setCoordinates] = useState<Coordinates>();
  const [questions, setQuestions] = useState<QuestionAndAnswer[]>([
    {
      question: '',
      answer: ''
    }
  ]);
  const history = useHistory();
  const [pageState, setNext, setPrev, renderForState] = usePageState([
    'ENTER_NAME',
    'CHOOSE_LOCATION',
    'ENTER_QUESTIONS',
    'ADDED'
  ]);

  const handleClickBack = () => {
    if (pageState === 'ENTER_NAME') {
      history.push('/');
    } else {
      setPrev();
    }
  };
  const handleNext = () => {
    if (pageState === 'ADDED') {
      history.push('/');
    } else {
      setNext();
    }
  };
  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      {
        question: '',
        answer: ''
      }
    ]);
  };
  const handleRemoveQuestion = () => {
    setQuestions(questions.splice(0, questions.length - 1));
  };

  return (
    <div>
      <Header iconType="back" onIconClick={handleClickBack}>
        {renderForState('ENTER_NAME', <span>Новая организация</span>)}
        {renderForState('CHOOSE_LOCATION', <span>Выберите местоположение</span>)}
        {renderForState('ENTER_QUESTIONS', <span>Контрольные вопросы</span>)}
      </Header>
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
        <div className={'backgrounded'}>
          {questions.map((value, index) => (
            <div key={index}>
              <Input
                className={'centered margins'}
                id={`question${index + 1}`}
                placeholderText={`Контрольный вопрос ${index + 1}`}
              />
              <Input className={'centered margins'} id={`answer${index + 1}`} placeholderText={`Ответ ${index + 1}`} />
            </div>
          ))}
          <div className={'centerize-flex'}>
            <Button className={'margins'} onClick={handleAddQuestion} disabled>
              Добавить
            </Button>
            <Button className={'margins'} onClick={handleRemoveQuestion} disabled={questions.length < 2}>
              Удалить последний
            </Button>
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
      <Button onClick={handleNext} className={'centerize centerize_bottom'}>
        Подтвердить
      </Button>
    </div>
  );
};
