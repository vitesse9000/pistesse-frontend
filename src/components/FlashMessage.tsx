import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { AlertType, clearFlashMessage } from '../actions/flash';
import { RootState } from '../store';

type MappedProps = {
  message: string | null,
  type: AlertType,
};

type MappedDispatchProps = {
  clear: () => void,
};

type OwnProps = {
  classNames?: string,
}

const FlashMessage = ({ message, type, classNames, clear }: MappedProps & MappedDispatchProps & OwnProps) => {
  if (message === null) {
    return <></>;
  }

  return (
    <div className={`row ${classNames}`}>
      <div className="col-auto mx-auto">
        <div className={`alert alert-dismissible fade show alert-${type}`} role="alert">
          {message}
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
            onClick={clear}
          />
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state: RootState): MappedProps => ({
  message: state.flash.message,
  type: state.flash.type,
});

const mapDispatchToProps = (dispatch: Dispatch): MappedDispatchProps => ({
  clear: () => dispatch(clearFlashMessage()),
});

export default connect(mapStateToProps, mapDispatchToProps)(FlashMessage);
