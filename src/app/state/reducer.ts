export const initialState = {
  shellWidth: 0,
  counter: 0,
  person: {
    age: 0,
    firstName: '',
    lastName: '',
  },
};

// this infers State type from initialState object???
export type State = typeof initialState;

export enum ActionTypes {
  setShellWidth = 'SET_SHELL_WIDTH',
  increment = 'INCREMENT',
  decrement = 'DECREMENT',
  setFirstName = 'SET_FIRST_NAME',
  setLastName = 'SET_LAST_NAME',
  setAge = 'SET_AGE',
}

export type Action =
  | { type: ActionTypes.setShellWidth, width: number }
  | { type: ActionTypes.increment }
  | { type: ActionTypes.decrement }
  | { type: ActionTypes.setFirstName, firstName: string }
  | { type: ActionTypes.setLastName, lastName: string }
  | { type: ActionTypes.setAge, age: number };

export const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case ActionTypes.setShellWidth: return {
      ...state,
      shellWidth: action.width,
    };
    case ActionTypes.increment: return {
      ...state,
      counter: state.counter + 1,
    };
    case ActionTypes.decrement: return {
      ...state,
      counter: state.counter - 1,
    };
    case ActionTypes.setFirstName: return {
      ...state,
      person: {
        ...state.person,
        firstName: action.firstName,
      },
    };
    case ActionTypes.setLastName: return {
      ...state,
      person: {
        ...state.person,
        lastName: action.lastName,
      },
    };
    case ActionTypes.setAge: return {
      ...state,
      person: {
        ...state.person,
        age: action.age,
      },
    };

    default: return state;
  }
};