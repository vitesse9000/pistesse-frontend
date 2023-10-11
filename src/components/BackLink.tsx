import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { unselectActivity } from '../actions/activities';

type MappedDispatchProps = {
  unselectActivity: () => void,
};

type Props = MappedDispatchProps;

const BackLink = ({ unselectActivity }: Props) => (
  <a onClick={unselectActivity} href="/#" className="px-0">&lt; Terug</a>
);

const mapDispatchToProps = (dispatch: Dispatch): MappedDispatchProps => ({
  unselectActivity: () => dispatch(unselectActivity()),
})

export default connect(null, mapDispatchToProps)(BackLink);
