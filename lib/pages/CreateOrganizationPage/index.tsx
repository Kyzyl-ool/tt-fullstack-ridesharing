import React, { useState } from 'react';
import './CreateOrganization.scss';
import { Backdrop } from 'components/Backdrop';
import { Header } from 'components/Header';
import { Input } from 'components/Input';
import { useHistory } from 'react-router-dom';
import usePageState from '../../hooks/usePageState';
import { Button } from 'components/Button';
import { Dialog } from 'components/Dialog/Dialog';

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
  const pageState = usePageState([
    {
      key: 'ENTER_NAME',
      name: 'Новая организация'
    },
    {
      key: 'CHOOSE_LOCATION',
      name: 'Выберите местоположение'
    },
    {
      key: 'ENTER_QUESTIONS',
      name: 'Контрольные вопросы'
    },
    {
      key: 'ADDED',
      name: ''
    }
  ]);

  const handleClickBack = () => {
    if (pageState.state.key === 'ENTER_NAME') {
      history.goBack();
    } else {
      pageState.setPrev();
    }
  };
  const handleNext = () => {
    if (pageState.state.key === 'ADDED') {
      history.goBack();
    } else {
      pageState.setNext();
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
        {pageState.state.name}
      </Header>
      <Backdrop>
        {pageState.Foo(
          'ENTER_NAME',
          <>
            <Input
              id={'organization-name'}
              placeholderText={'Введите название новой организации'}
              className={'centerize centerize_center'}
              onChange={value => setName(value)}
            />
          </>
        )}
        {pageState.Foo('CHOOSE_LOCATION', <></>)}
        {pageState.Foo(
          'ENTER_QUESTIONS',
          <div className={'backgrounded'}>
            {questions.map((value, index) => (
              <div key={index}>
                <Input
                  className={'centered margins'}
                  id={`question${index + 1}`}
                  placeholderText={`Контрольный вопрос ${index + 1}`}
                />
                <Input
                  className={'centered margins'}
                  id={`answer${index + 1}`}
                  placeholderText={`Ответ ${index + 1}`}
                />
              </div>
            ))}
            <div className={'centerize-flex'}>
              <Button className={'margins'} onClick={handleAddQuestion}>
                Добавить
              </Button>
              <Button className={'margins'} onClick={handleRemoveQuestion} disabled={questions.length < 2}>
                Удалить последний
              </Button>
            </div>
          </div>
        )}
        {pageState.Foo(
          'ADDED',
          <Dialog onClose={handleNext} hide={false}>
            Организация успешно добавлена
          </Dialog>
        )}
        <Button onClick={handleNext} className={'centerize centerize_bottom'}>
          Подтвердить
        </Button>
      </Backdrop>
    </div>
  );
};
