/**
 * @Author: Dominic Tracey <dpt>
 * @Date:   03-08-2017
 * @Email:  dominic.tracey@gmail.com
 * @Project: Hangboard
 * @Last modified by:   dpt
 * @Last modified time: 08-08-2017
 * @License: MIT
 * @Copyright: (c) 2017 Aquilon Consulting, Inc.
 */

import React from 'react'
import PropTypes from 'prop-types'
import {View} from 'react-native'
import AppText from './AppText'

// import {connect} from 'react-redux'
import {TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

class WeightView extends React.Component {

  static propTypes = {
    weight: PropTypes.number,
    title: PropTypes.string.isRequired,
    addCb: PropTypes.func.isRequired,
    removeCb: PropTypes.func.isRequired,
    allowUpdate: PropTypes.bool.isRequired,
  }

  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps) {
    return (!isNaN(nextProps.weight) && nextProps.weight !== this.props.weight)
  }

  render() {
    const {weight, title, addCb, removeCb, allowUpdate} = this.props
    const controls = allowUpdate ? (
      <View style={styles.container}>
        <TouchableOpacity
          accessible={true}
          accessibilityLabel={'Add Weight'}
          onPress={addCb}
          style={styles.timerButton}>
          <Icon name='add-circle-outline' size={34} color='black'/>
        </TouchableOpacity>
        <TouchableOpacity
          accessible={true}
          accessibilityLabel={'Remove Weight'}
          onPress={removeCb}
          style={styles.timerButton}>
          <Icon name='remove-circle-outline' size={34} color='black'/>
        </TouchableOpacity>
      </View>
    ) : null

    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <AppText size='lg'>{title}</AppText>
        </View>
        <View style={[styles.row, styles.rowplus]}>
          <AppText size='xl' align='center' flex='1'>{weight}</AppText>
          {controls}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  row: {
    //height: 50,
    flex: .5,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  rowplus: {
    flex: 1.5,
  },
  timerButton: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    flex: .4,
  },
})

export default WeightView
