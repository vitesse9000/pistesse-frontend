import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { selectActivity } from '../actions/activities';
import { Activity } from '../types/Activity';

type MappedDispatchProps = {
  selectActivity: (activity: Activity) => void,
};

type OwnProps = {
  activity: Activity,
};

type Props = MappedDispatchProps & OwnProps;

const ActivityRow = ({ activity, selectActivity }: Props) => (
  <tr
    onClick={() => selectActivity(activity)}
    role="button"
  >
    <td className="text-center">{activity.transponderId}</td>
  </tr>
);

const mapDispatchToProps = (dispatch: Dispatch): MappedDispatchProps => ({
  selectActivity: (activity: Activity) => dispatch(selectActivity(activity)),
});

export default connect(null, mapDispatchToProps)(ActivityRow);
