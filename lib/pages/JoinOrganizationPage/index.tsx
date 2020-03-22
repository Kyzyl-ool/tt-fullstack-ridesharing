import React, { useState } from 'react';
import usePageState from '../../hooks/usePageState';
import { Header } from 'components/Header';
import { useHistory } from 'react-router-dom';
import { Input } from 'components/Input';
import { SearchIcon } from '../../icons';
import './JoinOrganizationPage.scss';
import { LocationsList } from 'components/LocationsList';
import { Button } from 'components/Button';
import { Dialog } from 'components/Dialog/Dialog';

export const JoinOrganizationPage: React.FC = props => {
  const [questions, setQuestions] = useState<string[]>(['Откуда?', 'skjdkhas?', 'jkhasgdfkhjsgdfjakshdfgakhjsdf?']);
  const [selectedOrganization, setSelectedOrganization] = useState();
  const history = useHistory();
  const pageState = usePageState([
    {
      key: 'CHOOSE',
      name: 'Вступить в организацию'
    },
    {
      key: 'QUESTIONS',
      name: 'Контрольные вопросы'
    },
    {
      key: 'FINISH',
      name: ''
    }
  ]);
  const handleBack = () => {
    if (pageState.state.key === 'CHOOSE') {
      history.push('/');
    } else {
      pageState.setPrev();
    }
  };
  const handleNext = () => {
    if (pageState.state.key === 'FINISH') {
      history.push('/');
    } else {
      pageState.setNext();
    }
  };

  return (
    <div>
      <Header iconType={'back'} onIconClick={handleBack}>
        {pageState.state.name}
      </Header>
      {pageState.Foo(
        'CHOOSE',
        <div className={'rsh-backdrop backgrounded backgrounded_grey'}>
          <Input id={'organization-name'} placeholderText={'Поиск организации...'} icon={<SearchIcon />} />
          <LocationsList
            locations={[
              {
                address: 'asdasdas',
                name: '2131231'
              }
            ]}
            onSelectLocation={handleNext}
          />
        </div>
      )}
      {pageState.Foo(
        'QUESTIONS',
        <div className={'rsh-backdrop backgrounded'}>
          {questions.map((value, index) => (
            <div className={'margins'} key={index}>
              <span>{value}</span>
              <Input id={`question${index + 1}`} placeholderText={'Ответ'} />
            </div>
          ))}
          <Button className={'centerize centerize_bottom'} onClick={handleNext} filled>
            Отправить
          </Button>
        </div>
      )}
      {pageState.Foo(
        'FINISH',
        <>
          <Dialog onClose={handleNext} hide={false}>
            Поздравляем, Вы успешно присоединились к организации “Mail.ru Corp.”! Просмотреть его вы можете в своем
            профиле
          </Dialog>
        </>
      )}
    </div>
  );
};
