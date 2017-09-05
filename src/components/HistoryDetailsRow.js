import React from 'react'
import PropTypes from 'prop-types'
// import {Row, Column} from 'react-native-elements'
import {View, StyleSheet} from 'react-native'
import AppText from './AppText'
import RepsComplete from './RepsComplete'

const HistoryDetailsRow = (props) => {
  const {grip, set, weight, reps, lastSuccess} = props
  return (
    <View style={styles.outer}>
      <View style={styles.container}>
        <View style={styles.row}>
          <AppText size='sm'>{grip}</AppText>
        </View>
        <View style={styles.row}>
          <View style={styles.detail}>
            <AppText size='sm'>Set: {set} </AppText>
          </View>
          <View style={styles.detail}>
            <AppText size='sm'>Weight: {weight}</AppText>
          </View>
        </View>
      </View>
      <View style={styles.row}>
        <RepsComplete reps={reps} complete={lastSuccess} cb={noop}/>
      </View>
    </View>
  )
}

function noop() {}

HistoryDetailsRow.propTypes = {
  grip: PropTypes.string.isRequired,
  set: PropTypes.string.isRequired,
  weight: PropTypes.number.isRequired,
  reps: PropTypes.number.isRequired,
  lastSuccess: PropTypes.number.isRequired,
}

const styles = StyleSheet.create({
  container: {
    // height: 100,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  outer: {
    height: 100,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#dfdfdf',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  details: {
    flex: 1,
  },
  data: {
    flex: 1,
  },})
export default HistoryDetailsRow
