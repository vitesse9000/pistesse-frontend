import { connect } from 'react-redux';
import { Navigate, redirect } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { onCodeReceived, onErrorReceived } from '../actions/auth';
import { RootState } from '../store';

type MappedDispatchProps = {
  onErrorReceived: (error: string) => void,
  onCodeReceived: (provider: string, code: string, state: string) => void,
};

type Props = MappedDispatchProps & {};

const StravaCallback = (props: Props) => {
  const { onCodeReceived, onErrorReceived } = props;
  const [ searchParams ] = useSearchParams();

  if (searchParams.has('error')) {
    // Something went wrong.
    // Set state to display toast.
    onErrorReceived(searchParams.get('error') ?? '');
  } else {
    // All good. Use the code to get a token.
    const code = searchParams.get('code') ?? '';
    const state = searchParams.get('state') ?? '/';
    onCodeReceived('strava', code, state);
  }

  return <Navigate to={'/'} />;
};

const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, void, AnyAction>): MappedDispatchProps => ({
  onErrorReceived: (error: string) => dispatch(onErrorReceived(error)),
  onCodeReceived: (provider: string, code: string, state: string) => dispatch(onCodeReceived(provider, code, state)),
});

export default connect(null, mapDispatchToProps)(StravaCallback);
