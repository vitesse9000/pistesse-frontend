import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { toggleAll } from '../actions/sessions';
import { RootState } from '../store';

type MappedStateProps = {
  selectedAll: boolean,
};

type MappedDispatchProps = {
  toggleAll: () => void,
};

type Props = MappedStateProps & MappedDispatchProps;

const ToggleAll = ({ selectedAll, toggleAll }: Props) => (
  <tr className={selectedAll ? 'table-info': ''}>
    <td className="px-4" onClick={() => toggleAll()}>
      <div className="form-check ">
        <input className="form-check-input" type="checkbox" checked={selectedAll}/>
        <label className="form-check-label ms-2 fw-bold">
          Alle sessies
        </label>
      </div>
    </td>
  </tr>
);

const mapStateToProps = (state: RootState): MappedStateProps => ({
  selectedAll: state.sessions.selectedAll,
});

const mapDispatchToProps = (dispatch: Dispatch): MappedDispatchProps => ({
  toggleAll: () => dispatch(toggleAll()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ToggleAll);
