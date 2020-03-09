import React from 'react';
import ReactDOM from 'react-dom';
import Cars from './pages/trip-creation/4/Cars';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Cars />, div);
  ReactDOM.unmountComponentAtNode(div);
});
