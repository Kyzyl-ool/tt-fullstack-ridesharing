import React from 'react';
import './NearestOrganizationLabel.scss';

interface INearestOrganizationLabelProps {
  caption?: string;
  nearestOrganizationName: string;
  onClick: () => void;
}

export const NearestOrganizationLabel = ({
  nearestOrganizationName,
  caption = 'Ближайшая организация'
}: INearestOrganizationLabelProps) => {
  return (
    <div className="nearest-organization-label__container">
      <div className="nearest-organization-label__icon" />
      <div className="nearest-organization-label__text-wrapper">
        <div className="nearest-organization-label__text">{caption}</div>
        <div className="nearest-organization-label__name">{nearestOrganizationName}</div>
      </div>
    </div>
  );
};
