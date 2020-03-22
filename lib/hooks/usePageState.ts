import React, { useState } from 'react';

type PageState = {
  key: string;
  name?: string;
};

type FooArgType = {
  key: string;
  children: React.ReactNode;
};

interface IUsePageState {
  setNext: () => void;
  setPrev: () => void;
  state: PageState;
  goTo: (key: string) => void;
  Foo: (key: string, node: React.ReactNode) => React.ReactNode;
}

const usePageState = (pageStates: PageState[]): IUsePageState => {
  console.assert(pageStates.length > 0);
  const [states] = useState<PageState[]>(pageStates);
  const [currentState, setCurrentState] = useState(0);

  const setNext = () => {
    setCurrentState((currentState + 1) % states.length);
  };
  const setPrev = () => {
    setCurrentState((currentState - 1) % states.length);
  };
  const Foo = (key, children) => {
    if (key === states[currentState].key) {
      return children;
    } else {
      return null;
    }
  };
  const goTo = (key: string) => {
    const searchResult = states.find(value => value.key === key);
    console.assert(searchResult);
    setCurrentState(states.indexOf(searchResult));
  };

  return {
    setNext,
    setPrev,
    Foo,
    goTo,
    state: states[currentState]
  };
};

export default usePageState;
