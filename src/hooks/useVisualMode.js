import { useState } from 'react';

export default function useVisualMode(initial) {
  const [ mode, setMode ] = useState(initial);
  const [ history, setHistory ] = useState([initial]);

  const transition = (mode, replace=false) => {
    if (replace) {
      history[history.length - 1] = mode;
      setHistory(prev => [...prev]);
    } else {
      // history.push(mode);
      setHistory(prev => [...prev, mode]);
    }

    setMode(mode);
  };

  const back = () => {
    if (mode === initial) return;

    history.pop();
    setHistory(prev => [...prev]);
    setMode(history[history.length - 1]);
  };

  return {
    mode,
    transition,
    back,
    history,
  };
};