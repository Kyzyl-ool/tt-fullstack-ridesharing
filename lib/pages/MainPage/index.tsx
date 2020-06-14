import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../../components/Header';
import { NearestOrganizationLabel } from '../../components/NearestOrganizationLabel';
import { Button } from '../../components/Button';
import { useBlurredMap, useUserLocation } from 'hooks/mapHooks';
import './MainPage.scss';

export const MainPage = () => {
  useBlurredMap(true);
  return (
    <div>
      <Header iconType="menu" onIconClick={() => {}}>
        <div className="main-page__organization-label">
          <NearestOrganizationLabel onClick={() => {}} />
        </div>
      </Header>
      <div className="main-page__buttons-group">
        <Link to="/ride/create">
          <Button filled={true} onClick={() => {}} shadowed>
            Создать новую поездку
          </Button>
        </Link>
        <Link to="/ride/join">
          <Button filled={true} className="main-page__button" onClick={() => {}} shadowed>
            Присоединиться к поездке
          </Button>
        </Link>
      </div>
    </div>
  );
};
