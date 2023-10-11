import { connect } from 'react-redux';
import { RootState } from '../store';
import { Activity } from '../types/Activity';
import ActivityRow from './ActivityRow';

type MappedStateProps = {
  activities: Activity[],
};

type Props = MappedStateProps;

const ActivitiesList = ({ activities }: Props) => (
  <div className="row g-0">
    { activities.length !== 0 && (
      <>
        <label className="w-100 text-center mb-3 fw-bold">
          Selecteer jouw tracker
        </label>
        <table className="table table-hover table-borderless">
          <tbody>
            { activities.map((activity, index) => (
              <ActivityRow
                activity={activity}
                key={index}
              />
            )) }
          </tbody>
        </table>
      </>
      ) }
    { activities.length === 0 && (
      <>
        <label className="w-100 text-center mb-3 fw-bold">
          Geen trackers gevonden voor deze datum
        </label>
      </>
    ) }
  </div>
)

const mapStateToProps = (state: RootState): MappedStateProps => ({
  activities: state.activities.activities,
});

export default connect(mapStateToProps)(ActivitiesList);

