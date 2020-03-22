import React, { useState } from 'react';

type IUsePageState = [
  string,
  () => void,
  () => void,
  (key: string, node: React.ReactNode) => React.ReactNode,
  (key: string) => void
];

const usePageState = (states: string[]): IUsePageState => {
  console.assert(states.length > 0);
  const [currentState, setCurrentState] = useState(0);

  const setNext = () => {
    setCurrentState((currentState + 1) % states.length);
  };
  const setPrev = () => {
    setCurrentState((currentState - 1) % states.length);
  };
  const renderForState = (key, node) => {
    if (key === states[currentState]) {
      return node;
    } else {
      return null;
    }
  };
  const goTo = (key: string) => {
    const searchResult = states.find(value => value === key);
    console.assert(searchResult);
    setCurrentState(states.indexOf(searchResult));
  };

  return [states[currentState], setNext, setPrev, renderForState, goTo];
};

export default usePageState;
