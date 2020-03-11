/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-empty-interface */
import React, { PureComponent } from 'react';
import { Header } from '../../components/Header';
import { Backdrop } from '../../components/Backdrop';
import { Input } from '../../components/Input';
import { NearestOrganizationLabel } from '../../components/NearestOrganizationLabel';
import './CreateRidePage.scss';

interface ICreateRidePageProps {}
interface ICreateRidePageState {}

export class CreateRidePage extends PureComponent<ICreateRidePageProps, ICreateRidePageState> {
  render() {
    return (
      <div>
        <Header iconType="menu" onIconClick={() => {}}>
          <div className="create-ride-page__organization-label">
            <NearestOrganizationLabel nearestOrganizationName="Mail.ru Corp." onClick={() => {}} />
          </div>
        </Header>
        <Backdrop>
          <Input
            id="departure"
            className="create-ride-page__input"
            placeholderText="Откуда едете?"
            icon={<div className="create-ride-page__input-icon" />}
          />
        </Backdrop>
      </div>
    );
  }
}
