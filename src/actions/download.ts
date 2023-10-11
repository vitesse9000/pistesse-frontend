import axios from 'axios';
import { AppThunkDispatch } from '../store';

export const FETCHED_GPX = 'fethed_gpx';
export const FETCH_GPX_FAILED = 'feth_gpx_failed';
export const FETCH_GPX_SUCCEEDED = 'feth_gpx_succeeded';

export type FetchedGPXAction = {
  type: typeof FETCHED_GPX,
};

export type FetchGPXSucceededAction = {
  type: typeof FETCH_GPX_SUCCEEDED,
};

export type FetchGPXFailedAction = {
  type: typeof FETCH_GPX_FAILED,
};

const api = axios.create();

export const downloadFile = (id: number, sessionIds: number[]) => async (dispatch: AppThunkDispatch) => {
  dispatch({ type: FETCHED_GPX });

  try {
    const response = await api.get<string>(`/api/activities/${id.toString()}.gpx`, {
      params: {
        sessions: sessionIds.join(','),
      },
      responseType: 'blob',
    });

    const anchor = document.createElement('a');

    const url = URL.createObjectURL(new Blob([response.data]));
    anchor.setAttribute('href', url);
    anchor.href = url
    anchor.download = `${id.toString()}.gpx`;
    anchor.click();

    dispatch({ type: FETCH_GPX_SUCCEEDED });
  } catch {
    dispatch({ type: FETCH_GPX_FAILED });
  }
};
