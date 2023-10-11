import {
  SELECT_ACTIVITY,
  SelectActivityAction,
  UNSELECT_ACTIVITY,
  UnselectActivityAction,
} from '../actions/activities';
import { TOGGLE_ALL, TOGGLE_ONE, ToggleAllAction, ToggleOneAction } from '../actions/sessions';
import { Activity, SessionWithToggle } from '../types/Activity';

type State = {
  selectedActivityId?: number,
  selectedAll: boolean,
  sessions: SessionWithToggle[],
};

const initialState: State = {
  selectedActivityId: undefined,
  selectedAll: true,
  sessions: [],
};

type Action = ToggleAllAction | ToggleOneAction | SelectActivityAction | UnselectActivityAction;

const resetStateFromSelectedActivity = (activity: Activity): State => {
  return {
    selectedActivityId: activity.id,
    selectedAll: true,
    sessions: activity.sessions.map((session): SessionWithToggle => ({ ...session, isSelected: true })),
  };
};

const activities = (state: State | undefined = initialState, action: Action): State => {
  switch (action.type) {
    case SELECT_ACTIVITY:
      return resetStateFromSelectedActivity(action.payload);
    case UNSELECT_ACTIVITY:
      return initialState;
    case TOGGLE_ALL:
      const selectedAllToggled = !state.selectedAll;

      return {
        ...state,
        selectedAll: selectedAllToggled,
        sessions: state.sessions.map((session) => ({ ...session, isSelected: selectedAllToggled })),
      };
    case TOGGLE_ONE:
      const sessions = state.sessions.map((session) => {
        if (session.id === action.payload) {
          return {
            ...session,
            isSelected: !session.isSelected,
          };
        }

        return session;
      });

      let selectedAll = true;
      sessions.forEach((session) => {
        if (!session.isSelected) {
          selectedAll = false;
        }
      });

      return {
        ...state,
        selectedAll,
        sessions,
      }
  }

  return state;
};

export default activities;
