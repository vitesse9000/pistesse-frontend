import {
  FETCHED_GPX,
  FETCH_GPX_SUCCEEDED,
  FETCH_GPX_FAILED,
  FetchedGPXAction,
  FetchGPXFailedAction,
  FetchGPXSucceededAction,
} from '../actions/download';

type State = {
  isDownloading: boolean,
};

const initialState: State = {
  isDownloading: false,
};

type Action = FetchGPXFailedAction | FetchGPXSucceededAction | FetchedGPXAction;

const download = (state: State | undefined = initialState, action: Action): State => {
  switch (action.type) {
    case FETCHED_GPX:
      return {
        ...state,
        isDownloading: true,
      };
    case FETCH_GPX_FAILED:
    case FETCH_GPX_SUCCEEDED:
      return {
        ...state,
        isDownloading: false,
      };
  }

  return state;
};

export default download;
