import {
  FETCH_ACTIVITIES_BY_DATE_FAILED,
  FETCH_ACTIVITIES_BY_DATE_SUCCEEDED,
  FETCHED_ACTIVITIES_BY_DATE,
  FetchActivitiesByDateFailedAction,
  FetchActivitiesByDateSucceededAction,
  FetchedActivitiesByDateAction,
} from '../actions/activities';
import { Activity } from '../types/Activity';

type State = {
  isLoading: boolean,
  activities: Activity[],
};

const initialState: State = {
  isLoading: false,
  activities: [],
};

type Action = FetchedActivitiesByDateAction | FetchActivitiesByDateSucceededAction | FetchActivitiesByDateFailedAction;

const activities = (state: State | undefined = initialState, action: Action): State => {
  switch (action.type) {
    case FETCHED_ACTIVITIES_BY_DATE:
      return {
        ...state,
        isLoading: true,
        activities: [],
      };
    case FETCH_ACTIVITIES_BY_DATE_FAILED:
      return {
        ...state,
        isLoading: false,
        activities: [],
      };
    case FETCH_ACTIVITIES_BY_DATE_SUCCEEDED:
      return {
        ...state,
        isLoading: false,
        activities: action.payload,
      };
  }

  return state;
};

export default activities;
