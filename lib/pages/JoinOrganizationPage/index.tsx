import React, { useEffect, useState } from 'react';
import usePageState from '../../hooks/usePageState';
import { Header } from 'components/Header';
import { useHistory } from 'react-router-dom';
import { Input } from 'components/Input';
import { SearchIcon } from '../../icons';
import './JoinOrganizationPage.scss';
import { LocationsList } from 'components/LocationsList';
import { Button } from 'components/Button';
import { Dialog } from 'components/Dialog';
import _debounce from 'lodash/debounce';
import { IGetQuestionsResponseBody, OrganizationModel } from 'models/OrganizationModel';
import { ILocation } from 'domain/map';

export const JoinOrganizationPage: React.FC = props => {
  const [questions, setQuestions] = useState<IGetQuestionsResponseBody[]>([]);
  const [selectedOrganization, setSelectedOrganization] = useState<ILocation>();
  const history = useHistory();
  const [pageState, setNext, setPrev, renderForState] = usePageState(['CHOOSE', 'QUESTIONS', 'FINISH']);
  const [foundOrganizations, setFoundOrganizations] = useState<ILocation[]>([]);
  const [controlAnswer, setControlAnswer] = useState<string>('');

  const handleBack = () => {
    if (pageState === 'CHOOSE') {
      history.goBack();
    } else {
      setPrev();
    }
  };

  const makeSearch = _debounce(async (findString: string) => {
    if (findString.length > 0) {
      const result = await OrganizationModel.search(findString);
      setFoundOrganizations(result.map(value => ({ ...value, id: `${value.id}` })));
    }
  }, 300);

  const handleNext = async (location: ILocation) => {
    switch (pageState) {
      case 'FINISH': {
        history.push('/');
        break;
      }
      case 'QUESTIONS': {
        try {
          const res = await OrganizationModel.join({
            id: questions[0].id,
            controlAnswer: controlAnswer
          });
          setNext();
        } catch (e) {
          console.log(e);
        }
        break;
      }
      default: {
        setSelectedOrganization(location);
        const res = await OrganizationModel.getQuestions(+location.id);
        setQuestions([
          {
            ...res
          }
        ]);
        setNext();
        break;
      }
    }
  };

  return (
    <div>
      <Header iconType={'back'} onIconClick={handleBack}>
        {renderForState('CHOOSE', <span>Вступить в организацию</span>)}
        {renderForState('QUESTIONS', <span>Контрольные вопросы</span>)}
      </Header>
      {renderForState(
        'CHOOSE',
        <div className={'rsh-backdrop backgrounded backgrounded_grey'}>
          <Input
            id={'organization-name'}
            placeholderText={'Поиск организации...'}
            icon={<SearchIcon />}
            className={'join-organization-page__input'}
            onChange={v => makeSearch(v)}
          />
          <LocationsList locations={foundOrganizations} text={'Найденные организации:'} onSelectLocation={handleNext} />
        </div>,
        'appear'
      )}
      {renderForState(
        'QUESTIONS',
        <div className={'rsh-backdrop backgrounded'}>
          {questions.map((value, index) => (
            <div className={'margins'} key={index}>
              <span>{value.controlQuestion}</span>
              <Input id={`question${index + 1}`} placeholderText={'Ответ'} onChange={v => setControlAnswer(v)} />
            </div>
          ))}
          <Button className={'centerize centerize_bottom'} onClick={() => handleNext(null)} filled>
            Отправить
          </Button>
        </div>,
        'appear'
      )}
      {renderForState(
        'FINISH',
        <Dialog onClose={() => handleNext(null)} hide={false}>
          Поздравляем, Вы успешно присоединились к организации “{selectedOrganization && selectedOrganization.name}”!
          Просмотреть его вы можете в своем профиле
        </Dialog>,
        'appear'
      )}
    </div>
  );
};
