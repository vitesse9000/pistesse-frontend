import { AnyAction } from 'redux';
import { CHANGED_DATE, ChangeDateAction } from '../actions/date';

type State = {
  date: string,
};

const initialState: State = {
  date: new Date().toISOString().substring(0, 10),
};

type Action = AnyAction | ChangeDateAction;

const date = (state: State | undefined = initialState, action: Action): State => {
  switch (action.type) {
    case CHANGED_DATE:
      return {
        ...state,
        date: action.payload,
      };
  }

  return state;
};

export default date;
