import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {NavigationActions} from 'react-navigation';
import SetResultView from './SetResultView';
import * as WorkoutStateActions from '../workout/WorkoutState';
import {M,K} from '../../utils/constants'

export default connect(
   state => ({
     [K.CURRENT_EXERCISE_ID]: state.getIn(['workout',...M.COLLECT_SET_RESULTS,K.CURRENT_EXERCISE_ID]),
     [K.SET_ID]: state.getIn(['workout',...M.COLLECT_SET_RESULTS,K.SET_ID]),
     [K.GRIP_LABEL]: state.getIn(['workout',...M.COLLECT_SET_RESULTS,K.GRIP_LABEL]),
     [K.SET_LABEL]: state.getIn(['workout',...M.COLLECT_SET_RESULTS,K.SET_LABEL]),
     sessionWeight: state.getIn(['workout',...M.COLLECT_SET_RESULTS,'sessionWeight']),
     workoutWeight: state.getIn(['workout',...M.COLLECT_SET_RESULTS,'workoutWeight']),
     [K.REPS]: state.getIn(['workout',...M.COLLECT_SET_RESULTS,K.REPS]),
     numRepsComplete: state.getIn(['workout',...M.COLLECT_SET_RESULTS,'numRepsComplete']),
   }),
   dispatch => {
     return {
       navigate: bindActionCreators(NavigationActions.navigate, dispatch),
       workoutStateActions: bindActionCreators(WorkoutStateActions, dispatch)
     };
   }
)(SetResultView);
