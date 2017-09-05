import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import TimerView from './TimerView';
import * as TimerStateActions from '../timer/TimerState';
import * as WorkoutStateActions from '../workout/WorkoutState'
import {M} from '../../utils/constants'

export default connect(
  state => ({
    seconds: state.getIn(['timer', 'seconds']),
    running: state.getIn(['timer', 'running']),
    loading: state.getIn(['timer', 'loading']),
    color: state.getIn(['workout','session','color']),
    phase: state.getIn(['workout',...M.PHASE]),
    nextSound: state.getIn(['timer','nextSound']),
  }),
  dispatch => {
    return {
      timerStateActions: bindActionCreators(TimerStateActions, dispatch),
      workoutStateActions: bindActionCreators(WorkoutStateActions, dispatch)
    };
  }
)(TimerView);
