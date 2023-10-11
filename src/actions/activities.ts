import axios from 'axios';
import { AppThunkDispatch } from '../store';
import { Activity } from '../types/Activity';

export const FETCHED_ACTIVITIES_BY_DATE = 'fethed_activities_by_date';
export const FETCH_ACTIVITIES_BY_DATE_FAILED = 'feth_activities_by_date_failed';
export const FETCH_ACTIVITIES_BY_DATE_SUCCEEDED = 'feth_activities_by_date_succeeded';
export const SELECT_ACTIVITY = 'select_activity';
export const UNSELECT_ACTIVITY = 'unselect_activity';

export type FetchedActivitiesByDateAction = {
  type: typeof FETCHED_ACTIVITIES_BY_DATE,
};

export type FetchActivitiesByDateSucceededAction = {
  type: typeof FETCH_ACTIVITIES_BY_DATE_SUCCEEDED,
  payload: Activity[],
};

export type FetchActivitiesByDateFailedAction = {
  type: typeof FETCH_ACTIVITIES_BY_DATE_FAILED,
};

export type SelectActivityAction = {
  type: typeof SELECT_ACTIVITY,
  payload: Activity,
};

export type UnselectActivityAction = {
  type: typeof UNSELECT_ACTIVITY,
};

export const selectActivity = (activity: Activity): SelectActivityAction => ({
  type: SELECT_ACTIVITY,
  payload: activity,
});

export const unselectActivity = (): UnselectActivityAction => ({
  type: UNSELECT_ACTIVITY,
});

const fetchRankingSucceededAction = (data: Activity[]): FetchActivitiesByDateSucceededAction => ({
  type: FETCH_ACTIVITIES_BY_DATE_SUCCEEDED,
  payload: data,
});

const api = axios.create();

export const fetchActivities = (date: string) => async (dispatch: AppThunkDispatch) => {
  dispatch({ type: FETCHED_ACTIVITIES_BY_DATE });

  try {
    const response = await api.get<{ data: Activity[] }>(`/api/activities/${date}`);

    dispatch(fetchRankingSucceededAction(response.data.data));
  } catch {
    dispatch({ type: FETCH_ACTIVITIES_BY_DATE_FAILED });
  }
};
