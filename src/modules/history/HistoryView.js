import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View
} from 'react-native';

class HistoryView extends Component {
  static displayName = 'HistoryView';

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  };

  render() {
    return (
      <View style={styles.container} />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  }
});

export default HistoryView;
