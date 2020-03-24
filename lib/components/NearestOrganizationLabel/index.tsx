import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import MapModel from 'models/MapModel';
import './NearestOrganizationLabel.scss';

interface INearestOrganizationLabelProps {
  caption?: string;
  onClick: () => void;
}

export const NearestOrganizationLabel = ({ caption = 'Ближайшая организация' }: INearestOrganizationLabelProps) => {
  const { nearestOrganization } = useSelector(state => state.user);

  return (
    <div className="nearest-organization-label__container">
      <div className="nearest-organization-label__icon" />
      <div className="nearest-organization-label__text-wrapper">
        <div className="nearest-organization-label__text">{caption}</div>
        <div className="nearest-organization-label__name" title={nearestOrganization}>
          {nearestOrganization}
        </div>
      </div>
    </div>
  );
};
