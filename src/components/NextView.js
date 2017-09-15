import React from 'react'
import PropTypes from 'prop-types'
import {View} from 'react-native'
import AppText from './AppText';
import {StyleSheet} from 'react-native';

NextView.propTypes = {
  nextWeight: PropTypes.number,
  nextGrip: PropTypes.string.isRequired,
}

function NextView(props) {
  const weightLabel = props.nextGrip === 'Complete' ? '' : 'Weight ' + props.nextWeight
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <AppText size='lg'>Next</AppText>
      </View>
      <View style={[styles.row, styles.rowplus]}>
        <View style={styles.container}>
          <AppText size='sm'>{props.nextGrip}</AppText>
          <AppText size='sm'>{weightLabel}</AppText>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  row: {
    flex: .5,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  rowplus: {
    flex: 1,
  },
})

export default NextView
