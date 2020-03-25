import React from 'react';
import { Link } from 'react-router-dom';
import { Backdrop } from '../../components/Backdrop';
import { Header } from '../../components/Header';
import { NearestOrganizationLabel } from '../../components/NearestOrganizationLabel';
import { Button } from '../../components/Button';
import './MainPage.scss';

export const MainPage = () => {
  return (
    <div>
      <Header iconType="menu" onIconClick={() => {}}>
        <div className="main-page__organization-label">
          <NearestOrganizationLabel onClick={() => {}} />
        </div>
      </Header>
      <Backdrop>
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
      </Backdrop>
    </div>
  );
};
