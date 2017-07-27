import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import WorkoutView from './WorkoutView';
import {NavigationActions} from 'react-navigation';
import * as WorkoutStateActions from '../workout/WorkoutState';

export default connect(
  state => ({
    boards: state.getIn(['workout', 'boards']),
    sets: state.getIn(['workout', 'sets']),
    programs: state.getIn(['workout', 'programs']),
    workouts: state.getIn(['workout', 'workouts']),
    session: state.getIn(['workout', 'session'])
  }),
  dispatch => {
    return {
      navigate: bindActionCreators(NavigationActions.navigate, dispatch),
      workoutStateActions: bindActionCreators(WorkoutStateActions, dispatch)
    };
  }
)(WorkoutView);
