import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import SettingsView from './SettingsView';
import {M,K} from '../../utils/constants'
// import {NavigationActions} from 'react-navigation';
import * as SettingsStateActions from './SettingsState';
import * as ConfigurationStateActions from '../static/StaticState'

export default connect(
  state => ({
    ticksFor: state.getIn([K.SETTINGS,...M.TICKS_FOR]),
    beepsFor: state.getIn([K.SETTINGS,...M.BEEPS_FOR]),
    programs: state.getIn([K.CONFIGURATION,K.PROGRAMS]),
    defaultProgramId: state.getIn([K.SETTINGS,K.DEFAULT_PROGRAM_ID]),
    boards: state.getIn([K.CONFIGURATION,K.BOARDS]),
    defaultBoardId: state.getIn([K.SETTINGS,K.DEFAULT_BOARD_ID]),
  }),
  dispatch => ({
    // navigate: bindActionCreators(NavigationActions.navigate, dispatch),
    settingsStateActions: bindActionCreators(SettingsStateActions, dispatch),
    configurationStateActions: bindActionCreators(ConfigurationStateActions, dispatch),
  })
)(SettingsView);
