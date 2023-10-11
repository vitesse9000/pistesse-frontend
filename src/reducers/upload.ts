import {
  UPLOAD_ACTIVITY_FAILED,
  UPLOAD_ACTIVITY_STARTED,
  UPLOAD_ACTIVITY_SUCCEEDED,
  UploadActivityAction,
  UploadActivityFailedAction,
  UploadActivitySucceededAction,
} from '../actions/upload';

type State = {
  isUploading: boolean,
  activityId: number | null,
};

const initialState: State = {
  isUploading: false,
  activityId: null,
};

type Action = UploadActivityAction | UploadActivityFailedAction | UploadActivitySucceededAction;

const upload = (state: State | undefined = initialState, action: Action): State => {
  switch (action.type) {
    case UPLOAD_ACTIVITY_STARTED:
      return {
        ...state,
        activityId: null,
        isUploading: true,
      };
    case UPLOAD_ACTIVITY_SUCCEEDED:
      console.log('upload succeeded');
      console.log(action.payload);
      return {
        ...state,
        activityId: action.payload,
        isUploading: false,
      };
    case UPLOAD_ACTIVITY_FAILED:
      return {
        ...state,
        activityId: null,
        isUploading: false,
      };
  }

  return state;
};

export default upload;
