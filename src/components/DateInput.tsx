import { ChangeEvent } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { changeDate } from '../actions/date';
import { RootState } from '../store';

type MappedStateProps = {
  date: string,
};

type MappedDispatchProps = {
  changeDate: (event: ChangeEvent<HTMLInputElement>) => void,
};

type OwnProps = {
  className?: string,
};

type Props = OwnProps & MappedStateProps & MappedDispatchProps;

const DateInput = ({ className = '', date, changeDate }: Props) => (
  <form className={className}>
    <div className="form-group">
      <label className="text-center w-100 mb-3 fw-bold">
        Selecteer datum
      </label>
      <input className="form-control" type="date" value={date} onChange={changeDate}/>
    </div>
  </form>
);

const mapStateToProps = (state: RootState): MappedStateProps => ({
  date: state.date.date,
});

const mapDispatchToProps = (dispatch: Dispatch): MappedDispatchProps => ({
  changeDate: (event: ChangeEvent<HTMLInputElement>) => dispatch(changeDate(event.target.value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DateInput);
