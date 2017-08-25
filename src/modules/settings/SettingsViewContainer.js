import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import SettingsView from './SettingsView';
import {M} from '../../utils/constants'
import {NavigationActions} from 'react-navigation';
import * as SettingsStateActions from './SettingsState';

export default connect(
  state => ({
    ticksFor: state.getIn(['settings',...M.TICKS_FOR]),
    beepsFor: state.getIn(['settings',...M.BEEPS_FOR]),
  }),
  dispatch => ({
    navigate: bindActionCreators(NavigationActions.navigate, dispatch),
    settingsStateActions: bindActionCreators(SettingsStateActions, dispatch)
  })
)(SettingsView);
