import { useState } from 'react';

export default function useVisualMode(initial) {
  const [ mode, setMode ] = useState(initial);
  const [ history, setHistory ] = useState([initial]);

  // changes the view between depending on state of that slot ie. empty, saving, deleting, editing, etc...
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

  // goes back to previous state based on the history stack
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