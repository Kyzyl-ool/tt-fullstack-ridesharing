import React, { Fragment } from 'react';
import { Header } from 'components/Header';
import { Input } from 'components/Input';
import { NearestOrganizationLabel } from 'components/NearestOrganizationLabel';
import './InitialRideBlock.scss';

interface IInitialRideBlock {
  onInputClick: () => void;
}

export const InitialRideBlock = ({ onInputClick }: IInitialRideBlock) => {
  return (
    <Fragment>
      <Header iconType="menu" onIconClick={() => {}}>
        <NearestOrganizationLabel onClick={() => {}} />
      </Header>
      <div onClick={onInputClick}>
        <Input
          id="departure"
          className="initial-ride-block__fixed-input"
          placeholderText="Откуда едете?"
          icon={<div className="initial-ride-block__input-icon--from" />}
        />
      </div>
    </Fragment>
  );
};
