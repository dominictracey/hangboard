/**
 * @Author: Dominic Tracey <dpt>
 * @Date:   06-08-2017
 * @Email:  dominic.tracey@gmail.com
 * @Project: Hangboard
 * @Last modified by:   dpt
 * @Last modified time: 06-08-2017
 * @License: MIT
 * @Copyright: (c) 2017 Aquilon Consulting, Inc.
 */

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {NavigationActions} from 'react-navigation';
import StartView from './StartView';
import * as WorkoutStateActions from '../workout/WorkoutState'
import {K} from '../../utils/constants'

export default connect(
  state => ({
    boards: state.getIn([K.CONFIGURATION, 'boards']),
    sets: state.getIn([K.CONFIGURATION, 'sets']),
    programs: state.getIn([K.CONFIGURATION, 'programs']),
    workouts: state.getIn(['workout', 'workouts']),
    session: state.getIn(['workout', 'session']),
    theme: state.getIn(['workout',K.THEME]),
    history: state.get(K.HISTORY)
  }),
   dispatch => {
     return {
       navigate: bindActionCreators(NavigationActions.navigate, dispatch),
       workoutStateActions: bindActionCreators(WorkoutStateActions, dispatch)
     };
   }
)(StartView);
