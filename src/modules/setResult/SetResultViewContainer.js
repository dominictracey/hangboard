import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {NavigationActions} from 'react-navigation';
import SetResultView from './SetResultView';
import * as WorkoutStateActions from '../workout/WorkoutState';

export default connect(
   null,
   dispatch => {
     return {
       navigate: bindActionCreators(NavigationActions.navigate, dispatch),
       workoutStateActions: bindActionCreators(WorkoutStateActions, dispatch)
     };
   }
)(SetResultView);
