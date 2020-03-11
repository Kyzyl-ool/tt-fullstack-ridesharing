import React from 'react';
import './NearestOrganizationLabel.scss';

interface INearestOrganizationLabelProps {
  nearestOrganizationName: string;
  onClick: () => void;
}

export const NearestOrganizationLabel = ({ nearestOrganizationName }: INearestOrganizationLabelProps) => {
  return (
    <div className="nearest-organization-label__container">
      <div className="nearest-organization-label__icon" />
      <div className="nearest-organization-label__text-wrapper">
        <div className="nearest-organization-label__text">Ближайшая организация</div>
        <div className="nearest-organization-label__name">{nearestOrganizationName}</div>
      </div>
    </div>
  );
};
