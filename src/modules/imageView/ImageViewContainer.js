import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {NavigationActions} from 'react-navigation';
import ImageView from './ImageView';

export default connect(
   null,
   dispatch => {
     return {
       navigate: bindActionCreators(NavigationActions.navigate, dispatch)
     };
   }
)(ImageView);
