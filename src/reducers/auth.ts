import {
  CODE_EXCHANGE_STARTED,
  CODE_EXCHANGE_FAILED,
  TOKEN_RECEIVED,
  TOKEN_LOADED_FROM_STORAGE,
  TOKEN_EXPIRED,
  LOGOUT,
  TokenReceivedAction,
  TokenLoadedAction,
  TokenExpiredAction,
  LogoutAction,
  CodeExchangeStartedAction,
  CodeExchangeFailedAction,
} from '../actions/auth';

type State = {
  isLoading: boolean,
  loggedIn: boolean,
  token: null | string,
};

const initialState = {
  isLoading: false,
  loggedIn: false,
  token: null,
};

type Action =
  TokenReceivedAction |
  TokenExpiredAction |
  TokenLoadedAction |
  LogoutAction |
  CodeExchangeStartedAction |
  CodeExchangeFailedAction;

const auth = (state: State | undefined = initialState, action: Action): State => {
  switch (action.type) {
    case TOKEN_RECEIVED:
    case TOKEN_LOADED_FROM_STORAGE:
      return {
        ...state,
        isLoading: false,
        loggedIn: true,
        token: action.payload.token,
      };
    case LOGOUT:
    case TOKEN_EXPIRED:
      return initialState;
    case CODE_EXCHANGE_STARTED:
      return {
        ...state,
        isLoading: true,
      };
    case CODE_EXCHANGE_FAILED:
      return {
        ...state,
        isLoading: false,
      };
  }

  return state;
};

export default auth;
