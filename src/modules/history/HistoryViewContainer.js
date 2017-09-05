import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';
import HistoryView from './HistoryView';
import {K} from '../../utils/constants'
import {NavigationActions} from 'react-navigation'

export default connect(
  state => ({
    history: state.get(K.HISTORY)
  }),
  dispatch => ({
    navigate: bindActionCreators(NavigationActions.navigate, dispatch)
  })
)(HistoryView);
