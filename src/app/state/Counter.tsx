import * as React from 'react';

import { useDispatch, useGlobalState } from './state';
import { ActionTypes } from './reducer';

const { useCallback } = React;

const Counter = () => {
  const value = useGlobalState('counter');
  const dispatch = useDispatch();
  const increment = useCallback(() => dispatch({ type: ActionTypes.increment }), [dispatch]);
  const decrement = useCallback(() => dispatch({ type: ActionTypes.decrement }), [dispatch]);
  return (
    <div>
      <span>Count: {value}</span>
      <button type="button" onClick={increment}>+1</button>
      <button type="button" onClick={decrement}>-1</button>
    </div>
  );
};

export default Counter;