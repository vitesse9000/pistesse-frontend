import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { toggleOne } from '../actions/sessions';
import { SessionWithToggle } from '../types/Activity';

type OwnProps = {
  session: SessionWithToggle,
};

type MappedDispatchProps = {
  toggleOne: (id: number) => void,
};

type Props = MappedDispatchProps & OwnProps

const SessionRow = ({ session, toggleOne }: Props) => (
  <tr className={session.isSelected ? 'table-info': ''}>
    <td className="px-4" onClick={() => toggleOne(session.id)}>
      <div className="form-check">
        <input className="form-check-input" type="checkbox" checked={session.isSelected}/>
        <label className="form-check-label ms-2">
          <i>Sessie {session.id}:</i> {session.startTime} → {session.endTime}
        </label>
      </div>
    </td>
  </tr>
);

const mapDispatchToProps = (dispatch: Dispatch): MappedDispatchProps => ({
  toggleOne: (id: number) => dispatch(toggleOne(id)),
});

export default connect(null, mapDispatchToProps)(SessionRow);
