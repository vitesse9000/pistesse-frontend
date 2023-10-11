import { useEffect } from 'react';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { uploadActivity } from '../actions/upload';
import { RootState } from '../store';

type MappedStateProps = {
  isUploading: boolean,
  activityId: number,
  stravaActivityId: number | null,
  sessionIds: number[],
  noneSelected: boolean,
};

type MappedDispatchProps = {
  uploadActivity: (id: number, sessionIds: number[]) => void,
};

type OwnProps = {};

type Props = OwnProps & MappedStateProps & MappedDispatchProps;

const UploadBtn = ({ noneSelected, isUploading, uploadActivity, stravaActivityId, activityId, sessionIds }: Props) => {
  useEffect(() => {
    if (stravaActivityId) {
      const url = `https://www.strava.com/activities/${stravaActivityId}`;

      if (window.parent) {
        window.parent.location.href = url;
      } else {
        window.location.href = url;
      }
    }
  }, [stravaActivityId]);

  const spinner = (<span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>);
  let content = (
    <>
      Upload naar
      <i className="bi-strava ms-2"></i>
    </>
  );

  if (stravaActivityId) {
    content = <>{spinner} Doorsturen...</>
  }

  if (isUploading) {
    content = <>{spinner} Uploaden...</>
  }

  const disabled = isUploading || !!stravaActivityId || noneSelected;

  return (
    <button
      onClick={() => uploadActivity(activityId, sessionIds)}
      className={`btn btn-strava w-100 text-center text-light ${disabled ? 'disabled' : ''}`}
    >
      {content}
    </button>
  );
};

const mapStateToProps = (state: RootState): MappedStateProps => {
  const sessionIds = state.sessions.sessions.filter((session) => session.isSelected).map((session) => session.id);

  return {
    isUploading: state.upload.isUploading,
    activityId: state.sessions.selectedActivityId ?? 0,
    stravaActivityId: state.upload.activityId,
    sessionIds,
    noneSelected: sessionIds.length === 0,
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, void, AnyAction>): MappedDispatchProps => ({
  uploadActivity: (id, sessionIds) => dispatch(uploadActivity(id, sessionIds)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UploadBtn);
