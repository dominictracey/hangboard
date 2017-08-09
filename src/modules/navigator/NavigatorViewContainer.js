/**
 * @Author: Dominic Tracey <dpt>
 * @Date:   18-07-2017
 * @Email:  dominic.tracey@gmail.com
 * @Project: Hangboard
 * @Last modified by:   dpt
 * @Last modified time: 06-08-2017
 * @License: MIT
 * @Copyright: (c) 2017 Aquilon Consulting, Inc.
 */

import {connect} from 'react-redux';
import NavigatorView from './NavigatorView';

export default connect(
  state => ({
    navigatorState: state.get('navigatorState').toJS()
  })
)(NavigatorView);
