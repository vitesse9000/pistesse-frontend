import axios from 'axios';
import { Dispatch } from 'redux';
import { AppThunkDispatch, RootState } from '../store';
import { setFlashMessage } from './flash';

export const STRAVA_CALLBACK_ERROR = 'strava_callback_error';
export const CODE_EXCHANGE_STARTED = 'code_exchange_started';
export const CODE_EXCHANGE_FAILED = 'code_exchange_failed';
export const TOKEN_RECEIVED = 'token_received';
export const TOKEN_EXPIRED = 'token_expired';
export const TOKEN_LOADED_FROM_STORAGE = 'token_loaded_from_storage';
export const LOGOUT = 'logout';

type ActionWithTokenPayload = {
  payload: {
    token: string,
  },
};

export type CodeExchangeStartedAction = { type: typeof CODE_EXCHANGE_STARTED };
export type CodeExchangeFailedAction = { type: typeof CODE_EXCHANGE_FAILED };

export type TokenReceivedAction = ActionWithTokenPayload & {
  type: typeof TOKEN_RECEIVED,
};

export type TokenExpiredAction = ActionWithTokenPayload & {
  type: typeof TOKEN_EXPIRED,
};

export type TokenLoadedAction = ActionWithTokenPayload & {
  type: typeof TOKEN_LOADED_FROM_STORAGE,
};

export type LogoutAction = {
  type: typeof LOGOUT,
};

const tokenReceivedAction = (token: string): TokenReceivedAction => ({
  type: TOKEN_RECEIVED,
  payload: { token },
});

const tokenLoadedAction = (token: string): TokenLoadedAction => ({
  type: TOKEN_LOADED_FROM_STORAGE,
  payload: { token },
});

const tokenExpiredAction = (token: string): TokenExpiredAction => ({
  type: TOKEN_EXPIRED,
  payload: { token },
});

const api = axios.create();

export const onErrorReceived = (error: string) => (dispatch: Dispatch) => {
  dispatch({
    type: STRAVA_CALLBACK_ERROR,
    params: { error },
  });

  dispatch(setFlashMessage('Looks like that didn\'t work. Try again.', 'warning'));
}

export const onCodeReceived = (provider: string, code: string, state: string) => async (dispatch: AppThunkDispatch, getState: () => RootState) => {
  dispatch({ type: CODE_EXCHANGE_STARTED });

  try {
    const response = await api.post<{ access_token: string, expires_at: number, expires_in: number }>('/oauth/token', {
      client_id: process.env.REACT_APP_CLIENT_ID ?? '',
      grant_type: 'authorization_code',
      code,
    });

    // Store access token in local storage
    window.localStorage.setItem('access_token', response.data.access_token);
    window.localStorage.setItem('access_token_expires_at', response.data.expires_at.toString());

    dispatch(tokenReceivedAction(response.data.access_token));

    window.location.href = state;

    // Set timeout in case the user stays on this page for a very long time.
    await new Promise(resolve => setTimeout(resolve, response.data.expires_in * 1000));

    dispatch(tokenExpiredAction(response.data.access_token));
  } catch {
    const state = getState();

    if (state.auth.loggedIn) {
      // Ignore the error.
      return;
    }

    dispatch({ type: CODE_EXCHANGE_FAILED });
    dispatch(setFlashMessage('Something went wrong. Try again later.'));
  }
};

export const loadAuthentication = () => async (dispatch: AppThunkDispatch) => {
  const accessToken = window.localStorage.getItem('access_token');
  let expiresAt: string | null | number = window.localStorage.getItem('access_token_expires_at');

  if (null === accessToken || null === expiresAt) {
    window.localStorage.clear();
    // Do nothing.
    return;
  }

  // In ms
  expiresAt = parseInt(expiresAt) * 1000;

  // Check if it's expired.
  if (expiresAt < Date.now()) {
    // Expired.
    window.localStorage.clear();
    return;
  }

  dispatch(tokenLoadedAction(accessToken));

  // Set timeout in case the user stays on this page for a very long time.
  const expiresInMs = expiresAt - Date.now();
  await new Promise(resolve => setTimeout(resolve, expiresInMs));

  dispatch(tokenExpiredAction(accessToken));
};

export const logout = () => async (dispatch: AppThunkDispatch) => {
  window.localStorage.clear();

  dispatch({
    type: LOGOUT,
  })
};
