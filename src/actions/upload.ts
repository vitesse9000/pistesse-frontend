import axios from 'axios';
import { AppThunkDispatch } from '../store';

export const UPLOAD_ACTIVITY_STARTED = 'upload_activity_started';
export const UPLOAD_ACTIVITY_FAILED = 'upload_activity_failed';
export const UPLOAD_ACTIVITY_SUCCEEDED = 'upload_activity_succeeded';

export type UploadActivityAction = {
  type: typeof UPLOAD_ACTIVITY_STARTED,
};

export type UploadActivitySucceededAction = {
  type: typeof UPLOAD_ACTIVITY_SUCCEEDED,
  payload: number,
};

export type UploadActivityFailedAction = {
  type: typeof UPLOAD_ACTIVITY_FAILED,
};

const api = axios.create();

export const uploadActivity = (id: number, sessionIds: number[]) => async (dispatch: AppThunkDispatch) => {
  dispatch({ type: UPLOAD_ACTIVITY_STARTED });

  const token = window.localStorage.getItem('access_token');

  try {
    const response = await api.post<{ data: { activity_id: number }}>(`/api/activities/${id.toString()}`, {
      params: {
        sessions: sessionIds.join(','),
      },
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({
      type: UPLOAD_ACTIVITY_SUCCEEDED,
      payload: response.data.data.activity_id,
    });
  } catch {
    dispatch({ type: UPLOAD_ACTIVITY_FAILED });
  }
};
