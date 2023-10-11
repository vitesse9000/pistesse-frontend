// Either show login button or upload button. Depending on the auth state.
import { connect } from 'react-redux';
import { RootState } from '../store';
import Login from './Login';
import UploadBtn from './UploadBtn';

type MappedStateProps = {
  isLoggedIn: boolean,
}

type Props = MappedStateProps;

const StravaUpload = ({ isLoggedIn }: Props) => (
  <>
    {isLoggedIn && <UploadBtn />}
    {!isLoggedIn && <Login />}
  </>
);

const mapStateToProps = (state: RootState): MappedStateProps => ({
  isLoggedIn: state.auth.loggedIn,
});

export default connect(mapStateToProps)(StravaUpload);
