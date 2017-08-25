import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {NavigationActions} from 'react-navigation';
import SetResultView from './SetResultView';
import * as WorkoutStateActions from '../workout/WorkoutState';
import {M} from '../../utils/constants'

export default connect(
   state => ({
     exId: state.getIn(['workout',...M.COLLECT_SET_RESULTS,'exId']),
     setId: state.getIn(['workout',...M.COLLECT_SET_RESULTS,'setId']),
     grip: state.getIn(['workout',...M.COLLECT_SET_RESULTS,'grip']),
     setLabel: state.getIn(['workout',...M.COLLECT_SET_RESULTS,'setLabel']),
     sessionWeight: state.getIn(['workout',...M.COLLECT_SET_RESULTS,'sessionWeight']),
     workoutWeight: state.getIn(['workout',...M.COLLECT_SET_RESULTS,'workoutWeight']),
     reps: state.getIn(['workout',...M.COLLECT_SET_RESULTS,'reps']),
     numRepsComplete: state.getIn(['workout',...M.COLLECT_SET_RESULTS,'numRepsComplete']),
   }),
   dispatch => {
     return {
       navigate: bindActionCreators(NavigationActions.navigate, dispatch),
       workoutStateActions: bindActionCreators(WorkoutStateActions, dispatch)
     };
   }
)(SetResultView);
