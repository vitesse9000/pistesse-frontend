import { connect } from 'react-redux';
import { Navigate } from 'react-router';
import { logout } from '../actions/auth';

type MappedProps = {
  logout: () => void,
};

type Props = MappedProps & {};

const StravaCallback = (props: Props) => {
  const { logout } = props;

  logout();

  return <Navigate to="/" />;
};

const mapDispatchToProps = {
  logout: () => logout(),
};

export default connect(null, mapDispatchToProps)(StravaCallback);
