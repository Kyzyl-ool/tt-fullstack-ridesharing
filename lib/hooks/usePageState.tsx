import React, { useEffect, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import './PageStateHook.scss';

type AnimationType = 'appear' | 'none';
type IUsePageState = [
  string,
  () => void,
  () => void,
  (key: string, node: React.ReactNode, animate?: AnimationType) => React.ReactNode
];

const animationTypeToClassnames = {
  ['appear']: 'page-state-animations'
};

const usePageState = (states: string[]): IUsePageState => {
  console.assert(states.length > 0);
  const [currentState, setCurrentState] = useState(0);
  const [flag, setFlag] = useState<boolean>(false);

  const setNext = () => {
    setCurrentState((currentState + 1) % states.length);
  };
  const setPrev = () => {
    setCurrentState((currentState - 1) % states.length);
  };
  const renderForState = (key, node, animate = 'none'): React.ReactNode => {
    if (animate !== 'none') {
      return (
        <CSSTransition
          in={key === states[currentState]}
          timeout={300}
          classNames={animationTypeToClassnames[animate]}
          unmountOnExit
          onEnter={() => setFlag(true)}
          onExited={() => setFlag(false)}
          exit
        >
          {node}
        </CSSTransition>
      );
    } else {
      return key === states[currentState] ? node : null;
    }
  };
  return [states[currentState], setNext, setPrev, renderForState];
};

export default usePageState;
