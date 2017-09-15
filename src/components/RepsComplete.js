import React from 'react'
import PropTypes from 'prop-types'
import {View, TouchableOpacity} from 'react-native'
import AppText from './AppText'
import {pure} from 'recompose'

// import {connect} from 'react-redux'
import {StyleSheet} from 'react-native';

const RepsComplete = props => {

  const {reps, complete, cb, title = ''} = props

  let buttonArr = []
  for (let i = 1; i <= reps; ++i) {
    buttonArr.push(<TouchableOpacity
        accessible={true}
        accessibilityLabel={i + ' reps complete'}
        onPress={() => cb(i)}
        style={[styles.toButton, i <= complete ? styles.success : styles.fail]}
        key={i}>
      <AppText size='xs' theme='dark' flex='0' style={{backgroundColor: 'purple'}}>
        {i}
      </AppText>
    </TouchableOpacity>)
  }

  const titleRow = title ? <View style={styles.row}><AppText size='sm'>{title}</AppText></View> : null

  return (
    <View style={styles.container}>
      {titleRow}
      <View style={styles.row}>
        {/* {buttonArr.map((button) => button)} */}
        {buttonArr}
      </View>
    </View>
  )
}

RepsComplete.propTypes = {
  reps: PropTypes.number.isRequired,
  complete: PropTypes.number.isRequired,
  title: PropTypes.string,
  cb: PropTypes.func.isRequired,
}

RepsComplete.defaultProps = {
  displayName: 'RepsComplete',
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    //borderWidth: 2,
    borderColor: '#dfdfdf',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
  success: {
    backgroundColor: 'green',
  },
  fail: {
    backgroundColor: 'red',
  },
  toButton: {
    // flex: 1,
    padding: 5,
    backgroundColor: 'blue',
    // flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 1,
    alignSelf: 'stretch',
  },
})

export default pure(RepsComplete)
