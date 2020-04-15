import React from 'react';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import './LoadingPage.scss';

export const CenteredLoader: React.FC = props => {
  return (
    <div className={'loader-container'}>
      <Loader
        type="Oval"
        color="#33A852"
        height={100}
        width={100}
        timeout={99999} //3 secs
      />
      <h3>Загрузка</h3>
    </div>
  );
};
