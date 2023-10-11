import { configureStore } from '@reduxjs/toolkit';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import auth from './reducers/auth';
import date from './reducers/date';
import flash from './reducers/flash';
import activities from './reducers/activities';
import sessions from './reducers/sessions';
import download from './reducers/download';
import upload from './reducers/upload';

export const store = configureStore({
  reducer: {
    auth,
    activities,
    flash,
    date,
    sessions,
    download,
    upload,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunkDispatch = ThunkDispatch<RootState, unknown, AnyAction>;
