/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-empty-interface */
import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { Container } from 'semantic-ui-react';
import { Header } from 'components/Header';
import { Backdrop } from 'components/Backdrop';
import { Input } from 'components/Input';
import { Map } from 'components/Map';
import { Slider } from 'components/Slider';
import { NearestOrganizationLabel } from 'components/NearestOrganizationLabel';
import { OrganizationsList } from 'components/OrganizationsList';
import { organizationsListStub } from '../__stubs__';
import './JoinRidePage.scss';

interface IJoinRidePage {}

export const JoinRidePage = () => {
  const [isOrganizationListShown, setIsOrganizationListShown] = useState(false);

  const onLabelClick = () => setIsOrganizationListShown(!isOrganizationListShown);

  return (
    <div>
      <Header iconType="menu" onIconClick={() => {}}>
        <div className="join-ride-page__organization-label">
          <NearestOrganizationLabel nearestOrganizationName="Mail.ru Corp." onClick={onLabelClick} />
        </div>
      </Header>
      <Backdrop>
        <div onClick={onLabelClick}>
          <Input
            id="departure"
            className="join-ride-page__input"
            placeholderText="Откуда едете?"
            icon={<div className="join-ride-page__input-icon" />}
          />
        </div>
        <Slider showCondition={isOrganizationListShown} from="bottom" timeout={600} unmountOnExit>
          <div className="join-ride-page__organizations-list">
            <OrganizationsList organizations={organizationsListStub} onSelectOrganization={() => {}} />
          </div>
        </Slider>
      </Backdrop>
    </div>
  );
};
