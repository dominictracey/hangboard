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

import React, {PropTypes} from 'react'
import {View, Text} from 'react-native'
// import {connect} from 'react-redux'
import {StyleSheet} from 'react-native';

NextView.propTypes = {
  nextWeight: PropTypes.number,
  nextGrip: PropTypes.string.isRequired,
}

function NextView(props) {
  //const gripLabel = props.nextGrip === 'Complete' ? '' : 'Grip '
  const weightLabel = props.nextGrip === 'Complete' ? '' : 'Weight '
  return (
    <View style={styles.container}>
      <Text style={styles.details}>Next</Text>
      <View style={styles.la_container}>
        <Text style={styles.detailsSm}>{props.nextGrip}</Text>
        <Text style={styles.detailsSm}>{weightLabel} {props.nextWeight}</Text>
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
  la_container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: 'white',
  },
  details: {
    color: '#878787',
    fontSize: 32,
    textAlign: 'center'
  },
  detailsSm: {
    flex: 1,
    color: '#878787',
    fontSize: 16,
    textAlign: 'center'
  },
})

export default NextView
