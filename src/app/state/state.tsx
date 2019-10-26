import * as React from 'react';

import { Action, initialState, reducer, State } from './reducer';

const { createContext, useContext, useReducer } = React;

// In this “state2.tsx”, we use two contexts for state itself and dispatch function
const stateCtx = createContext(initialState);
const dispatchCtx = createContext((() => 0) as React.Dispatch<Action>);

export const Provider: React.ComponentType = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <dispatchCtx.Provider value={dispatch}>
      <stateCtx.Provider value={state}>
        {children}
      </stateCtx.Provider>
    </dispatchCtx.Provider>
  );
};

export const useDispatch = () => {
  return useContext(dispatchCtx);
};

export const useGlobalState = <K extends keyof State>(property: K) => {
  const state = useContext(stateCtx);
  // only one depth selector for comparison
  return state[property];
};