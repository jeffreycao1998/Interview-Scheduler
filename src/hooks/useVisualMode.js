import { useState } from 'react';

export default function useVisualMode(initial) {
  const [ mode, setMode ] = useState(initial);
  const [ history, setHistory ] = useState([initial]);

  const transition = (mode, replace=false) => {
    if (replace) {
      history[history.length - 1] = mode;
    } else {
      history.push(mode);
    }

    setMode(mode);
  };

  const back = () => {
    if (mode === initial) return;

    history.pop();
    setMode(history[history.length - 1]);
  };

  return {
    mode,
    transition,
    back,
  };
};