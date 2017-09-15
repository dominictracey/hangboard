/**
 * @Author: Dominic Tracey <dpt>
 * @Date:   08-08-2017
 * @Email:  dominic.tracey@gmail.com
 * @Project: Hangboard
 * @Last modified by:   dpt
 * @Last modified time: 08-08-2017
 * @License: MIT
 * @Copyright: (c) 2017 Aquilon Consulting, Inc.
 */

import React from 'react'
import PropTypes from 'prop-types'
import {View, StyleSheet} from 'react-native'
import {List, ListItem} from 'react-native-elements'
import {pure} from 'recompose'
import AppText from './AppText'

class WorkoutListView extends React.Component {

  static propTypes = {
    lastWorkoutId: PropTypes.string,
    workouts: PropTypes.object.isRequired,
    loadCb: PropTypes.func.isRequired,
    theme: PropTypes.string,
  }

  loadWorkout = (id) => {
    this.props.loadCb(id)
  }

  buildList = () => {
    const {workouts, lastWorkoutId} = this.props

    var arr = []
    const sorted = workouts.sortBy((v,k) => -parseInt(k))
    sorted.mapKeys((id) => {
      if (id !== lastWorkoutId) {
        arr.push(
          <ListItem key={id}
              onPress={() => this.loadWorkout(id)}
              title={workouts.getIn([id,'name'])}
            />
        )
      }
    })
    //console.log('workout list created of len ' + arr.length)

    return arr
  }

  render() {
    //const background = this.props.theme === 'dark' ? styles.dark : styles.light
    return (
        <View style={styles.padTop}>
          <AppText size='sm' theme={this.theme}>or pick a different workout:</AppText>
          <List>
          {this.buildList()}
        </List></View>
    )
  }
}

const styles = StyleSheet.create({
  padTop: {
    paddingTop: 20,
  },
})

export default pure(WorkoutListView)
