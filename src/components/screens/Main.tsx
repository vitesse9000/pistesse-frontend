import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { fetchActivities } from '../../actions/activities';
import { RootState } from '../../store';
import { connect } from 'react-redux';
import Activities from '../Activities';
import DateInput from '../DateInput';
import FlashMessage from '../FlashMessage';
import Spinner from '../Spinner';

type MappedStateProps = {
  isLoading: boolean,
  date: string,
  selectedActivityId?: number,
};

type MappedDispatchProps = {
  fetchActivities: (date: string) => void,
};

const Main = ({ isLoading, fetchActivities, date, selectedActivityId }: MappedStateProps & MappedDispatchProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    fetchActivities(date);
  }, [date, fetchActivities]);

  useEffect(() => {
    if (selectedActivityId) {
      navigate(`/activities/${selectedActivityId}`);
    }
  }, [selectedActivityId, navigate]);

  return (
    <>
      <FlashMessage classNames="my-5" />
      <DateInput className="mb-5" />
      {isLoading && <Spinner />}
      {!isLoading && <Activities />}
    </>
  );
};

const mapStateToProps = (state: RootState): MappedStateProps => ({
  isLoading: state.activities.isLoading,
  date: state.date.date,
  selectedActivityId: state.sessions.selectedActivityId,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, void, AnyAction>): MappedDispatchProps => ({
  fetchActivities: (date: string) => dispatch(fetchActivities(date)),
});

export default connect(mapStateToProps)(connect(null, mapDispatchToProps)(Main));
