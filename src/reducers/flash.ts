import {
  AlertType,
  CLEAR_FLASH_MESSAGE,
  ClearFlashMessageAction,
  SET_FLASH_MESSAGE,
  SetFlashMessageAction,
} from '../actions/flash';

type State = {
  message: string | null,
  type: AlertType,
};

const initialState: State = {
  message: null,
  type: 'warning',
};

type Action = SetFlashMessageAction | ClearFlashMessageAction;

const flash = (state: State | undefined = initialState, action: Action): State => {
  switch (action.type) {
    case SET_FLASH_MESSAGE:
      return {
        ...state,
        message: action.payload.message,
        type: action.payload.type,
      };
    case CLEAR_FLASH_MESSAGE:
      return {
        message: null,
        type: 'warning',
      };
  }

  return state;
};

export default flash;
