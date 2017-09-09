import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import AppView from './AppView';
import {initializeSessionState} from './session/SessionState'

export default connect(
  state => ({
    isReady: state.getIn(['session', 'isReady'])
  }),
  dispatch => ({
    clearState: bindActionCreators(initializeSessionState, dispatch)
  })
)(AppView);
