import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { RootState } from '../../store';
import { connect } from 'react-redux';
import { Activity, SessionWithToggle } from '../../types/Activity';
import BackLink from '../BackLink';
import DownloadBtn from '../DownloadBtn';
import SessionRow from '../SessionRow';
import StravaUpload from '../StravaUpload';
import ToggleAll from '../ToggleAll';

type MappedStateProps = {
  selectedActivity?: Activity,
  sessions: SessionWithToggle[]
};

type MappedDispatchProps = {};

type OwnProps = {};

type Props = MappedStateProps & MappedDispatchProps & OwnProps;

const ActivityDetail = ({ sessions, selectedActivity }: Props) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedActivity === undefined) {
      navigate(`/`);
    }
  }, [selectedActivity, navigate]);

  return (
    <>
      <div className="row mb-5 mx-auto">
        <BackLink />
      </div>
      <div className="row mb-5 g-0">
        <a className="text-decoration-none text-vitesse-dark" href={`https://sporthive.com/Practice/Details/${ selectedActivity?.id }`}>
          <h2>
              { selectedActivity?.transponderId }
            <small className="text-muted d-block">
              { selectedActivity?.date }
            </small>
          </h2>
        </a>
      </div>
      <div className="row mb-5 g-0">
        <table className="w-100 table table-hover table-borderless">
          <tbody>
          <ToggleAll />
          {sessions.map((session, index) => (
            <SessionRow
              session={session}
              key={index}
            />
          ))}
          </tbody>
        </table>
      </div>
      <div className="row g-0">
        <DownloadBtn />
      </div>
      <div className="row my-3">
        <div className="col-auto mx-auto">
          of
        </div>
      </div>
      <div className="row g-0">
          <StravaUpload />
      </div>
    </>
  );
};

const mapStateToProps = (state: RootState): MappedStateProps => ({
  sessions: state.sessions.sessions,
  selectedActivity: state.activities.activities.find((activity) => activity.id === state.sessions.selectedActivityId),
});

export default connect(mapStateToProps)(ActivityDetail);
