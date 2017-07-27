import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import TimerView from './TimerView';
import {NavigationActions} from 'react-navigation';
import * as TimerStateActions from '../timer/TimerState';

export default connect(
  state => ({
    seconds: state.getIn(['timer', 'seconds']),
    running: state.getIn(['timer', 'running']),
    loading: state.getIn(['timer', 'loading'])
  }),
  dispatch => {
    return {
      navigate: bindActionCreators(NavigationActions.navigate, dispatch),
      timerStateActions: bindActionCreators(TimerStateActions, dispatch)
    };
  }
)(TimerView);
