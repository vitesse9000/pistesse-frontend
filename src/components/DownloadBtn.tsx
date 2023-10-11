import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { downloadFile } from '../actions/download';
import { RootState } from '../store';

type MappedStateProps = {
  isDownloading: boolean,
  activityId: number,
  sessionIds: number[],
  noneSelected: boolean,
};

type MappedDispatchProps = {
  downloadFile: (id: number, sessionIds: number[]) => void,
};

type OwnProps = {
  activityId: number,
};

type Props = OwnProps & MappedStateProps & MappedDispatchProps;

const DownloadBtn = ({ noneSelected, isDownloading, downloadFile, activityId, sessionIds }: Props) => {
  return (
    <button
      onClick={() => downloadFile(activityId, sessionIds)}
      className={`btn btn-strava w-100 text-center text-light ${isDownloading || noneSelected ? 'disabled' : ''}`}
    >
      { isDownloading && <>
        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Loading...
      </> }
      { !isDownloading && <>
        <i className="bi bi-download me-2" />
        Download GPX
      </> }
    </button>
  );
};

const mapStateToProps = (state: RootState): MappedStateProps => {
  const sessionIds = state.sessions.sessions.filter((session) => session.isSelected).map((session) => session.id);

  return {
    isDownloading: state.download.isDownloading,
    activityId: state.sessions.selectedActivityId ?? 0,
    sessionIds,
    noneSelected: sessionIds.length === 0,
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, void, AnyAction>): MappedDispatchProps => ({
  downloadFile: (id, sessionIds) => dispatch(downloadFile(id, sessionIds)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DownloadBtn);
