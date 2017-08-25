/**
 * @Author: Dominic Tracey <dpt>
 * @Date:   19-07-2017
 * @Email:  dominic.tracey@gmail.com
 * @Project: Hangboard
 * @Last modified by:   dpt
 * @Last modified time: 08-08-2017
 * @License: MIT
 * @Copyright: (c) 2017 Aquilon Consulting, Inc.
 */

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import TimerView from './TimerView';
import {NavigationActions} from 'react-navigation';
import * as TimerStateActions from '../timer/TimerState';
import * as WorkoutStateActions from '../workout/WorkoutState'
import {M} from '../../utils/constants'

export default connect(
  state => ({
    seconds: state.getIn(['timer', 'seconds']),
    running: state.getIn(['timer', 'running']),
    loading: state.getIn(['timer', 'loading']),
    color: state.getIn(['workout','session','color']),
    ticksFor: state.getIn(['settings',...M.TICKS_FOR]),
    beepsFor: state.getIn(['settings',...M.BEEPS_FOR]),
    phase: state.getIn(['workout',...M.PHASE]),
    nextSound: state.getIn(['timer','nextSound'])
  }),
  dispatch => {
    return {
      navigate: bindActionCreators(NavigationActions.navigate, dispatch),
      timerStateActions: bindActionCreators(TimerStateActions, dispatch),
      workoutStateActions: bindActionCreators(WorkoutStateActions, dispatch)
    };
  }
)(TimerView);
